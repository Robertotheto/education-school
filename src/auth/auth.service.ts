import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    //nan//
  }
  async validateTeacherLocal(
    email: string,
    password: string,
  ): Promise<Teacher> {
    let teacher: Teacher;
    try {
      teacher = await this.prisma.teacher.findFirst({
        where: {
          email,
        },
      });
      if (!teacher.email) {
        throw new UnauthorizedException('Email or password is invalid');
      }
    } catch (error) {
      return null;
    }
    const isPasswordValid = compareSync(password, teacher.password);
    if (!isPasswordValid) return null;
    return teacher;
  }
  async validateTeacher(teacherId: string): Promise<Teacher> {
    return await this.prisma.teacher.findFirst({
      where: {
        id: teacherId,
      },
    });
  }
  async login(
    email: string,
    password: string,
  ): Promise<{
    accessToken: string;
    teacher: Teacher;
  }> {
    let teacher: Teacher;
    try {
      teacher = await this.prisma.teacher.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true,
          password: true,
          formation: true,
        },
      });
      if (!teacher.email) {
        throw new UnauthorizedException('Email or password is invalid');
      }
    } catch (error) {
      return null;
    }
    const isPasswordValid = compareSync(password, teacher.password);
    if (!isPasswordValid) return null;
    teacher.password = undefined;
    return {
      accessToken: this.jwtService.sign({ teacherId: teacher.id }),
      teacher,
    };
  }
}

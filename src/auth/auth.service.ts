import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    //nan//
  }
  async validateTeacherLocal(email: string, password: string) {
    let teacher: Teacher;
    try {
      teacher = await this.prisma.teacher.findUnique({
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
  async validateTeacher(teacherId: string) {
    return await this.prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });
  }
  async login(email: string, password: string): Promise<Auth> {
    let teacher: Teacher;
    try {
      teacher = await this.prisma.teacher.findUnique({
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
    return {
      accessToken: this.jwtService.sign({ teacherId: teacher.id }),
    };
  }
}

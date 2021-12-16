import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { TeachersService } from 'src/teachers/teachers.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly teacherService: TeachersService,
  ) {
    //nan//
  }
  async validateTeacher(email: string, password: string) {
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
    return await this.teacherService.findSigning(email);
  }
}

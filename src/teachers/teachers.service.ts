import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { hash } from 'bcrypt';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {
    //nan//
  }
  async create(createTeacherDto: CreateTeacherDto) {
    const hashPassword = await hash(createTeacherDto.password, 10);
    const teacher = await this.prisma.teacher.create({
      data: {
        id: createTeacherDto.id,
        name: createTeacherDto.name,
        email: createTeacherDto.email,
        cpf: createTeacherDto.cpf,
        password: hashPassword,
        formation: createTeacherDto.formation,
      },
    });
    teacher.password = undefined;
    return teacher;
  }

  async findAll() {
    return this.prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        password: false,
        formation: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const teacher = await this.prisma.teacher.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          cpf: true,
          formation: true,
        },
      });
      if (!teacher) {
        throw new NotFoundException(`Teacher ${id} not found`);
      }
      return teacher;
    } catch (error) {
      throw new NotFoundException(error.message, 'Teacher not found');
    }
  }

  async update(id: string, data: UpdateTeacherDto) {
    try {
      const hashPassword = await hash(data.password, 10);
      const teacher = await this.prisma.teacher.update({
        where: { id },
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          password: hashPassword,
          cpf: data.cpf,
          formation: data.formation,
        },
      });
      teacher.password = undefined;
      return teacher;
    } catch (error) {
      throw new NotFoundException(error.message, 'Teacher not found');
    }
  }

  remove(id: string) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}

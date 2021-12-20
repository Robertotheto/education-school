import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { hash } from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {
    //nda//
  }
  async create(createStudentDto: CreateStudentDto) {
    const hashPassword = await hash(createStudentDto.password, 10);
    const student = await this.prisma.student.create({
      data: {
        id: createStudentDto.id,
        name: createStudentDto.name,
        email: createStudentDto.email,
        cpf: createStudentDto.cpf,
        password: hashPassword,
        formation: createStudentDto.formation,
      },
    });
    student.password = undefined;
    return student;
  }

  findAll() {
    return this.prisma.student.findMany({
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
      const student = await this.prisma.student.findUnique({
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
      if (!student) {
        throw new NotFoundException(`Student ${id} not found`);
      }
      return student;
    } catch (error) {
      throw new NotFoundException(error.message, 'Student not found');
    }
  }

  async update(id: string, data: UpdateStudentDto) {
    const student = await this.prisma.student.update({
      where: { id },
      data,
    });
    return student;
  }

  remove(id: string) {
    return this.prisma.student.delete({
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) { }
  create(data: CreateTeacherDto) {
    return this.prisma.teacher.create({
      data,
    });
  }

  findAll() {
    return this.prisma.teacher.findMany();
  }

  findOne(id: string) {
    return this.prisma.teacher.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateTeacherDto) {
    return this.prisma.teacher.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}

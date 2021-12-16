import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from '@prisma/client';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {
    //nan//
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<
    {
      name: string;
      email: string;
      cpf: string;
      formation: string[];
    }[]
  > {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.teachersService.remove(id);
  }
}

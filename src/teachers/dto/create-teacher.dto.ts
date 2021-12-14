import { Prisma } from '@prisma/client';
import {
  IsEmail,
  IsEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Teacher } from '../entities/teacher.entity';

export class CreateTeacherDto extends Teacher {
  @IsString({ message: 'This name is required' })
  @IsEmpty({
    message: 'Name cannot be empty',
  })
  @MinLength(3, { message: 'Name must have a minimum of 3 characters' })
  @MaxLength(120, { message: 'Name must have a maximum of 120 characters' })
  name: string;

  @IsEmail('This email is required')
  @IsEmpty({
    message: 'Email cannot be empty',
  })
  email: string;

  @IsString({ message: 'This password is required' })
  @IsEmpty({
    message: 'Password cannot be empty',
  })
  @MinLength(8, { message: 'Password must have a minimum of 8 characters' })
  @MaxLength(20, { message: 'Password must have a maximum of 20 characters' })
  password: string;

  @IsString({ message: 'This cpf is required' })
  @IsEmpty({
    message: 'Cpf cannot be empty',
  })
  @MinLength(11, { message: 'Cpf must have a minimum of 11 characters' })
  @MaxLength(11, { message: 'Cpf must have a maximum of 11 characters' })
  cpf: string;

  @IsString({ message: 'This formation is required', each: true })
  @IsEmpty({
    message: 'Formation cannot be empty',
  })
  formation: Prisma.TeacherCreateformationInput | Prisma.Enumerable<string>;
}

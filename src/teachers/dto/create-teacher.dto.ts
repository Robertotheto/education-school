import { IsEmail, IsEmpty, IsNumber, IsString } from 'class-validator';
import { Teacher } from '../entities/teacher.entity';

export class CreateTeacherDto extends Teacher {
  @IsString()
  @IsEmpty()
  name: string;

  @IsEmail()
  @IsEmpty()
  email: string;

  @IsNumber()
  @IsEmpty()
  cpf: number | bigint;

  @IsString()
  @IsEmpty()
  formation: string;
}

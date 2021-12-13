import { IsEmail, IsEmpty, IsInt, IsString } from 'class-validator';
import { Teacher } from '../entities/teacher.entity';

export class CreateTeacherDto extends Teacher {
  @IsString()
  @IsEmpty()
  name: string;

  @IsEmail()
  @IsEmpty()
  email: string;

  @IsInt()
  cpf: number;

  @IsString()
  @IsEmpty()
  formation: string;
}

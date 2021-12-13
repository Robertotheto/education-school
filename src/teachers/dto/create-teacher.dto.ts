import { Teacher } from '../entities/teacher.entity';

export class CreateTeacherDto extends Teacher {
  name: string;
  email: string;
  cpf: number | bigint;
  formation: string;
}

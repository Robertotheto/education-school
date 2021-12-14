import { Prisma } from '@prisma/client';

export class Teacher implements Prisma.TeacherUncheckedCreateInput {
  id?: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  formation: Prisma.TeacherCreateformationInput | Prisma.Enumerable<string>;
}

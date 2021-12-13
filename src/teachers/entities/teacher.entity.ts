import { Prisma } from '@prisma/client';

export class Teacher implements Prisma.TeacherUncheckedCreateInput {
  id?: string;
  name: string;
  email: string;
  cpf: number;
  formation: string;
}

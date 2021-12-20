import { Prisma } from '@prisma/client';

export class Student implements Prisma.StudentUncheckedCreateInput {
  id?: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  formation?: Prisma.StudentCreateformationInput | Prisma.Enumerable<string>;
}

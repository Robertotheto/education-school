import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { TeachersModule } from './teachers/teachers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, TeachersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

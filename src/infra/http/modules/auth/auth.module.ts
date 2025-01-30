import { Module } from '@nestjs/common';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { ColumnRepositoryPrisma } from '../../../persistence/prisma/repositories/column-repository-prisma';
import { AuthController } from './auth.controller';
import UserRepository from '@/domain/repositories/user-repository';
import { UserRepositoryPrisma } from '@/infra/persistence/repositories/user-repository-prisma';
import Register from '@/app/usecases/auth/register';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    Register,
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma,
    },
  ],
  exports: [],
})
export class AuthModule {} 
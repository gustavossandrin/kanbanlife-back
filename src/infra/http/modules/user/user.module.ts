import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { UserRepositoryPrisma } from '../../../persistence/prisma/repositories/user-repository-prisma';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrisma,
    },
  ],
  exports: [],
})
export class UserModule {} 
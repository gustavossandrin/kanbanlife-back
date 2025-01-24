import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { UserRepositoryPrisma } from '../../../persistence/prisma/repositories/user-repository-prisma';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryPrisma,
    },
  ],
  exports: [UserService],
})
export class UserModule {} 
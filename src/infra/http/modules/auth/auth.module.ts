import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { ColumnRepositoryPrisma } from '../../../persistence/prisma/repositories/column-repository-prisma';
import { AuthController } from './auth.controller';
import UserRepository from '@/domain/repositories/user-repository';
import Register from '@/app/usecases/auth/register';
import { Login } from '@/app/usecases/auth/login';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { UserRepositoryPrisma } from '@/infra/persistence/prisma/repositories/user-repository-prisma';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    Register,
    Login,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma,
    },
  ],
  exports: [],
})
export class AuthModule {} 
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/infra/persistence/prisma/prisma.service';
import { LoginInput } from '@/shared/inputs/auth/login-input';
import { compare } from 'bcrypt';
import InvalidCredentialsError from '@/domain/errors/invalid-credentials';
import { Either, left, right } from '@/domain/errors/either';

export interface LoginOutput {
  access_token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

@Injectable()
export class Login {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async execute(input: LoginInput): Promise<Either<Error, LoginOutput>> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const isPasswordValid = await compare(input.password, user.password);

    if (!isPasswordValid) {
      return left(new InvalidCredentialsError());
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return right({
      access_token: token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  }
}

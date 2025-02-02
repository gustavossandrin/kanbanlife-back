import Register from '@/app/usecases/auth/register';
import { Login } from '@/app/usecases/auth/login';
import EmailAlreadyInUseError from '@/domain/errors/email-already-in-use';
import InvalidCredentialsError from '@/domain/errors/invalid-credentials';
import { RegisterInput } from '@/shared/inputs/auth/register-input';
import { LoginInput } from '@/shared/inputs/auth/login-input';
import { Body, Controller, HttpCode, Post, UnprocessableEntityException, ConflictException, UnauthorizedException, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly register: Register,
    private readonly loginService: Login,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginInput, @Res() response: Response) {
    const result = await this.loginService.execute(body);

    if (result.isLeft()) {
      if (result.value instanceof InvalidCredentialsError) {
        throw new UnauthorizedException({
          message: result.value.message
        });
      }

      throw new UnprocessableEntityException({
        message: result.value.message,
      });
    }

    response.cookie('token', result.value.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      domain: this.configService.get('COOKIE_DOMAIN'),
      path: '/',
      maxAge: 24 * 60 * 60 * 1000
    });

    const { access_token, ...userData } = result.value;
    return response.json(userData);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logout(@Res() response: Response) {
    response.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      domain: this.configService.get('COOKIE_DOMAIN')
    });
    return response.json({ message: 'Logged out successfully' });
  }

  @Post('register')
  @HttpCode(200)
  async registerUser(@Body() body: RegisterInput) {
    const result = await this.register.execute(body);

    if (result.isLeft()) {
      if (result.value instanceof EmailAlreadyInUseError) {
        throw new ConflictException({
          message: result.value.message
        });
      }

      throw new UnprocessableEntityException({
        message: result.value.message,
        fields: result.value.fields,
      });
    }

    return;
  }
}

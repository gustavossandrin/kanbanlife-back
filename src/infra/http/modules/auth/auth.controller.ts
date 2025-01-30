import Register from '@/app/usecases/auth/register';
import EmailAlreadyInUseError from '@/domain/errors/email-already-in-use';
import { RegisterInput } from '@/shared/inputs/auth/register-input';
import { Body, Controller, HttpCode, Post, UnprocessableEntityException, ConflictException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly register: Register
  ) {}

  // @Post('login')
  // @HttpCode(200)
  // async login(@Body() body: LoginInput) {
  //   const result = await this._login.execute(body);

  //   if (result.isLeft()) {
  //     throw result.value;
  //   }

  //   return result.value;
  // }

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

    return result.value;
  }
}

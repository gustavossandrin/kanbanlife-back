import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterInput } from 'src/shared/inputs/auth/register-input';

@Controller('auth')
export class AuthController {
  constructor(
    // private readonly _login: Login,
    private readonly _register: Register,
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
  async register(@Body() body: RegisterInput) {
    const result = await this._register.execute(body);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}

import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
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

  // @Post('register')
  // @HttpCode(200)
  // async register(@Body() body: RegisterInput) {
  //   const result = await this._register.execute(body);

  //   if (result.isLeft()) {
  //     throw result.value;
  //   }

  //   return result.value;
  // }
}

import { Controller } from '@nestjs/common';


@Controller('users')
export class UserController {
  constructor() {}

  // @Post()
  // create(@Body() createUserDto: CreateUserInput) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserInput) {
  //   return this.userService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
} 
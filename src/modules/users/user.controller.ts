import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

import { UserService } from 'src/modules/users/user.service';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    // DTO (CreateUserDto) faz a validação dos dados

    return await this.userService.createUser(userData);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Put('/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ) {
    return await this.userService.updateUserById(id, userData);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    return await this.userService.deleteUserById(id);
  }
}

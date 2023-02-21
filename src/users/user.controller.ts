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
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

import { randomUUID } from 'node:crypto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('/users')
export class UserController {
  // antes
  // private userRepository = new UserRepository();

  // depois
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    // DTO (CreateUserDto) faz a validação dos dados

    const userEntity = new UserEntity();
    userEntity.id = randomUUID();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;

    this.userRepository.createUser(userEntity);

    return {
      id: userEntity.id,
      message: 'User registered',
    };
  }

  @Get()
  async getUsers() {
    const users = await this.userRepository.getUsers();

    const usersDTO = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
      };
    });

    return usersDTO;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    const updatedUser = await this.userRepository.updateUser(id, userData);

    return updatedUser;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userRepository.deleteUser(id);

    return user;
  }
}

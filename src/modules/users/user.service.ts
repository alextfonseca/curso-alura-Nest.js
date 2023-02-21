import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dtos/createUser.dto';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const userAlreadyExists = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: CreateUserDto = await this.prisma.users.create({
      data,
    });

    return { user, message: 'User created successfully' };
  }

  async getUserById(id: string) {
    return await this.prisma.users.findFirst({
      where: {
        id,
      },
    });
  }

  async updateUserById(id: string, data: UpdateUserDto) {
    const userExists = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.users.update({
      data,
      where: {
        id,
      },
    });

    return { message: 'User updated successfully' };
  }

  async deleteUserById(id: string) {
    const userExists = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.users.delete({
      where: {
        id,
      },
    });

    return { message: 'User deleted successfully' };
  }
}

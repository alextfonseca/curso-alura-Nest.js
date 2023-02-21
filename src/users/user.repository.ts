import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';

import { UserEntity } from './user.entity';

@Injectable()
@ValidatorConstraint() // decorator que indica que essa classe é um validator async
export class UserRepository {
  private users: UserEntity[] = [];

  async createUser(userData: UserEntity) {
    this.users.push(userData);
  }

  async getUsers() {
    return this.users;
  }

  async getUserByEmail(email: string) {
    const emailAlreadyExists = this.users.find((user) => user.email === email);

    return emailAlreadyExists !== undefined;
  }

  async updateUser(id: string, userData: Partial<UserEntity>) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }

    // Object.entries retorna um array com as chaves e valores de um objeto
    Object.entries(userData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return { id: user.id, message: 'User updated' };
  }

  async deleteUser(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }

    this.users.splice(userIndex, 1);

    return { id, message: 'User deleted' };
  }
}

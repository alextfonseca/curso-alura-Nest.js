import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserEmailValidator } from './validator/userEmail.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserEmailValidator], // qualquer classe que tenha o decorator @Injectable() é um provider, nesse exemplo, UserRepository que é responsável por gerenciar os dados dos usuários como salvar, buscar, deletar, etc.
})
export class UserModule {}

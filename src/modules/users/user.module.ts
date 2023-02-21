import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/modules/users/user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService], // qualquer classe que tenha o decorator @Injectable() é um provider, nesse exemplo, UserRepository que é responsável por gerenciar os dados dos usuários como salvar, buscar, deletar, etc.
})
export class UserModule {}

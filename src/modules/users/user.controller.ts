import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/modules/users/user.service';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('/users')
@UseGuards(AuthGuard('jwt')) // obriga a passar o access token no header da requisição para acessar os métodos
export class UserController {
  constructor(private userService: UserService) {}

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

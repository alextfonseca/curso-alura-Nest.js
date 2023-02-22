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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/users/user.service';
import { GetUserSwagger } from 'src/swagger/user.swagger';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('/users')
@UseGuards(AuthGuard('jwt')) // obriga a passar o access token no header da requisição para acessar os métodos
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  @ApiOperation({
    summary: 'Get user information by id',
  })
  @ApiResponse({
    status: 200,
    description: 'User data',
    type: GetUserSwagger,
  })
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update user information',
  })
  async updateUserById(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ) {
    return await this.userService.updateUserById(id, userData);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete user from database',
  })
  async deleteUserById(@Param('id') id: string) {
    return await this.userService.deleteUserById(id);
  }
}

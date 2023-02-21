import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() userData: CreateUserDto) {
    return await this.userService.createUser(userData);
  }
}

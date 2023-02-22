import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserSwagger } from 'src/swagger/user.swagger';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @ApiOperation({
    summary: 'Log in to the platform and generate the access token',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginUserSwagger,
  })
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('/register')
  @ApiOperation({
    summary: 'Register new user on the platform',
  })
  @ApiResponse({
    status: 200,
    description: 'User created successful',
  })
  async register(@Body() userData: CreateUserDto) {
    return await this.userService.createUser(userData);
  }
}

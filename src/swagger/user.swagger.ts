import { ApiProperty } from '@nestjs/swagger';

export class LoginUserSwagger {
  @ApiProperty()
  access_token: string;
}

export class GetUserSwagger {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  userEmail: string;
}

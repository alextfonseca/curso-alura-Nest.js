import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  id: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  password: string;
}

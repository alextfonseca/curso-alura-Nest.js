import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  password: string;
}

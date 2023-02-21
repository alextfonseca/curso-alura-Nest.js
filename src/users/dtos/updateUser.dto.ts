import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UserEmailValidatorProvider } from '../validator/userEmail.validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @UserEmailValidatorProvider({ message: 'Email already exists' })
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  password: string;
}

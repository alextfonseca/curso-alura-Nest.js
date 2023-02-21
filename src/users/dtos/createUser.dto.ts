import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UserEmailValidatorProvider } from '../validator/userEmail.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @UserEmailValidatorProvider({ message: 'Email already exists' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint()
export class UserEmailValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UserRepository) {}

  async validate(value: string): Promise<boolean> {
    const emailAlreadyExists = await this.usuarioRepository.getUserByEmail(
      value,
    );

    return !emailAlreadyExists;
  }
}

// função para registrar o decorator no class-validator e passar o validator como parâmetro para o decorator @IsUserEmail já que o decorator @IsUserEmail não pode receber parâmetros
export function UserEmailValidatorProvider(
  validationOptions: ValidationOptions,
) {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: UserEmailValidator,
    });
  };
}

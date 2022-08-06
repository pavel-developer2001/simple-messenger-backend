import { IsEmail, Length } from 'class-validator';

export class RegisterUserDto {
  @Length(5, 10, { message: 'Логин должен быть от 5 до 10 символов' })
  name: string;

  @Length(6, 32, { message: 'Пароль должен минимум 6 символов' })
  password: string;
}

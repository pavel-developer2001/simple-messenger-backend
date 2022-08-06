import { Length } from 'class-validator';

export class LoginUserDto {
  name: string;

  @Length(6, 32, { message: 'Пароль должен минимум 6 символов' })
  password: string;
}

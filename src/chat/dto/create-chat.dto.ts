import { Length } from 'class-validator';

export class CreateChatDto {
  @Length(4, 20, { message: 'Длина названия чата от 4 до 20 символов' })
  chatTitle: string;
}

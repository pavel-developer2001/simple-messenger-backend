import { Length } from 'class-validator';

export class CreateChatMessageDto {
  @Length(1, 200, { message: 'Длина сообщения от 1 до 200 символов' })
  message: string;

  chatId: number;

  userId: number;
}

import { Length } from 'class-validator';

export class CreateChannelPostDto {
  @Length(1, 5000, { message: 'Длина поста канала от 1 до 5000 символов' })
  post: string;

  channelId: number;
}

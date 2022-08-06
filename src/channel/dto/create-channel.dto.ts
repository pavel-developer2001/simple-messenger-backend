import { Length } from 'class-validator';

export class CreateChannelDto {
  @Length(6, 30, { message: 'Длина названия канала от 6 до 30 символов' })
  channelTitle: string;
  @Length(8, 50, { message: 'Длина описания канала от 8 до 50 символов' })
  channelDescription: string;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { ChatMessagesEntity } from './entities/chat-message.entity';

@Injectable()
export class ChatMessagesService {
  constructor(
    @InjectRepository(ChatMessagesEntity)
    private repository: Repository<ChatMessagesEntity>,
  ) {}

  async create(createChatMessageDto: CreateChatMessageDto) {
    return await this.repository.save({
      ...createChatMessageDto,
      chat: { _id: createChatMessageDto.chatId },
      user: { _id: createChatMessageDto.userId },
    });
  }

  async findOne(id: number) {
    return await this.repository.find({ where: { chat: { _id: id } } });
  }

  remove(id: number) {
    return `This action removes a #${id} chatMessage`;
  }
}

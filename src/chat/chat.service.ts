import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMembersService } from 'src/chat-members/chat-members.service';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private repository: Repository<ChatEntity>,
    private chatMembersService: ChatMembersService,
  ) {}

  async create(createChatDto: CreateChatDto, userId: number) {
    const checkTitle = await this.repository.findOne({
      where: { chatTitle: createChatDto.chatTitle },
    });
    if (checkTitle) {
      throw new HttpException(
        'Чат с таким названием уже создан',
        HttpStatus.FORBIDDEN,
      );
    }
    const createChat = await this.repository.save({
      ...createChatDto,
      user: { _id: userId },
    });
    await this.chatMembersService.joinedAdmin(
      createChat._id,
      createChat.user._id,
    );
    return createChat;
  }

  async findAll() {
    return await this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}

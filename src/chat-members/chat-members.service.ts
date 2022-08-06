import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatMemberDto } from './dto/create-chat-member.dto';
import { ChatMembersEntity } from './entities/chat-member.entity';

@Injectable()
export class ChatMembersService {
  constructor(
    @InjectRepository(ChatMembersEntity)
    private repository: Repository<ChatMembersEntity>,
  ) {}

  async join(createChatMemberDto: CreateChatMemberDto, userId: number) {
    const check = await this.repository.findOne({
      where: {
        user: { _id: userId },
        chat: { _id: createChatMemberDto.chatId },
      },
    });
    if (check) {
      throw new HttpException(
        'Этот пользователь уже вступил в этот чат',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.repository.save({
      chat: { _id: createChatMemberDto.chatId },
      user: { _id: userId },
    });
  }

  async findOne(id: number) {
    return await this.repository.find({ where: { chat: { _id: id } } });
  }
  async check(id: number, userId: number) {
    const findMember = await this.repository.findOne({
      where: { user: { _id: userId }, chat: { _id: id } },
    });
    if (findMember) {
      return { status: true };
    }
    return { status: false };
  }

  async exit(id: number, userId: number) {
    const findMember = await this.repository.findOne({
      where: {
        user: { _id: userId },
        chat: { _id: id },
      },
    });

    if (!findMember) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    await this.repository.delete(findMember._id);
    return findMember;
  }
  async joinedAdmin(id: number, userId: number) {
    const check = await this.repository.findOne({
      where: {
        user: { _id: userId },
        chat: { _id: id },
      },
    });
    if (check) {
      throw new HttpException(
        'Этот пользователь уже вступил в этот чат',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.repository.save({
      chat: { _id: id },
      user: { _id: userId },
      status: 'Админ',
    });
  }
}

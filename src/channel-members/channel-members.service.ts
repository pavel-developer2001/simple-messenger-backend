import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChannelMemberDto } from './dto/create-channel-member.dto';
import { ChannelMembersEntity } from './entities/channel-member.entity';

@Injectable()
export class ChannelMembersService {
  constructor(
    @InjectRepository(ChannelMembersEntity)
    private repository: Repository<ChannelMembersEntity>,
  ) {}

  async joined(createChannelMemberDto: CreateChannelMemberDto, userId: number) {
    const check = await this.repository.findOne({
      where: {
        user: { _id: userId },
        channel: { _id: createChannelMemberDto.channelId },
      },
    });
    if (check) {
      throw new HttpException(
        'Этот пользователь уже вступил в этот канал',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.repository.save({
      channel: { _id: createChannelMemberDto.channelId },
      user: { _id: userId },
    });
  }

  async findOne(id: number) {
    return await this.repository.find({ where: { channel: { _id: id } } });
  }

  async check(id: number, userId: number) {
    const findMember = await this.repository.findOne({
      where: { user: { _id: userId }, channel: { _id: id } },
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
        channel: { _id: id },
      },
    });

    if (!findMember) {
      throw new HttpException(
        'пользователь не найден',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.repository.delete(findMember._id);
    return findMember;
  }

  async joinedAdmin(id: number, userId: number) {
    const check = await this.repository.findOne({
      where: {
        user: { _id: userId },
        channel: { _id: id },
      },
    });
    if (check) {
      throw new HttpException(
        'Этот пользователь уже вступил в этот канал',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.repository.save({
      channel: { _id: id },
      user: { _id: userId },
      status: 'Админ',
    });
  }
}

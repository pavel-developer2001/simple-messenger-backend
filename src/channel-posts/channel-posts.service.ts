import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChannelPostDto } from './dto/create-channel-post.dto';
import { ChannelPostsEntity } from './entities/channel-post.entity';

@Injectable()
export class ChannelPostsService {
  constructor(
    @InjectRepository(ChannelPostsEntity)
    private repository: Repository<ChannelPostsEntity>,
  ) {}
  async create(createChannelPostDto: CreateChannelPostDto, userId: number) {
    return await this.repository.save({
      ...createChannelPostDto,
      channel: { _id: createChannelPostDto.channelId },
      user: { _id: userId },
    });
  }

  async findOne(id: number) {
    return await this.repository.find({ where: { channel: { _id: id } } });
  }

  remove(id: number) {
    return `This action removes a #${id} channelPost`;
  }
}

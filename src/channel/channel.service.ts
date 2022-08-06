import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembersService } from 'src/channel-members/channel-members.service';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelEntity } from './entities/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private repository: Repository<ChannelEntity>,
    private channelMembersService: ChannelMembersService,
  ) {}

  async create(createChannelDto: CreateChannelDto, userId: number) {
    const checkChannel = await this.repository.findOne({
      where: { channelTitle: createChannelDto.channelTitle },
    });
    if (checkChannel) {
      throw new HttpException(
        'Канал с таким названием уже создан',
        HttpStatus.FORBIDDEN,
      );
    }
    const createChannel = await this.repository.save({
      ...createChannelDto,
      user: { _id: userId },
    });
    await this.channelMembersService.joinedAdmin(
      createChannel._id,
      createChannel.user._id,
    );
    return createChannel;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}

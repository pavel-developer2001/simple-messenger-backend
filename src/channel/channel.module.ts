import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelEntity } from './entities/channel.entity';
import { ChannelMembersModule } from 'src/channel-members/channel-members.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity]), ChannelMembersModule],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}

import { Module } from '@nestjs/common';
import { ChannelMembersService } from './channel-members.service';
import { ChannelMembersController } from './channel-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMembersEntity } from './entities/channel-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelMembersEntity])],
  controllers: [ChannelMembersController],
  providers: [ChannelMembersService],
  exports: [ChannelMembersService],
})
export class ChannelMembersModule {}

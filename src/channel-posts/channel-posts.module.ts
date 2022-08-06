import { Module } from '@nestjs/common';
import { ChannelPostsService } from './channel-posts.service';
import { ChannelPostsController } from './channel-posts.controller';
import { ChannelPostsEntity } from './entities/channel-post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelPostsEntity])],
  controllers: [ChannelPostsController],
  providers: [ChannelPostsService]
})
export class ChannelPostsModule {}

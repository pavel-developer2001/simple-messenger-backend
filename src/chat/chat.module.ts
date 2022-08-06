import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { ChatMembersModule } from 'src/chat-members/chat-members.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity]), ChatMembersModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}

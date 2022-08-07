import { Module } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { ChatMessagesController } from './chat-messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessagesEntity } from './entities/chat-message.entity';
import { ChatMessagesGateway } from './chat-messages.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessagesEntity])],
  controllers: [ChatMessagesController],
  providers: [ChatMessagesService,ChatMessagesGateway]
})
export class ChatMessagesModule {}

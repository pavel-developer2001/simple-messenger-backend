import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { ChatMessagesService } from './chat-messages.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@Controller('chat-messages')
export class ChatMessagesController {
  constructor(private readonly chatMessagesService: ChatMessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createChatMessageDto: CreateChatMessageDto,
    @User() userId: number,
  ) {
    return this.chatMessagesService.create(createChatMessageDto, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatMessagesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatMessagesService.remove(+id);
  }
}

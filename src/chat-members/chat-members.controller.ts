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
import { ChatMembersService } from './chat-members.service';
import { CreateChatMemberDto } from './dto/create-chat-member.dto';

@Controller('chat-members')
export class ChatMembersController {
  constructor(private readonly chatMembersService: ChatMembersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('join')
  joinedInChat(
    @Body() createChatMemberDto: CreateChatMemberDto,
    @User() userId: number,
  ) {
    return this.chatMembersService.join(createChatMemberDto, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatMembersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check/:id')
  checkMember(@Param('id') id: string, @User() userId: number) {
    return this.chatMembersService.check(+id,userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('exit/:id')
  exitFromChat(@Param('id') id: string,@User() userId: number) {
    return this.chatMembersService.exit(+id,userId);
  }
}

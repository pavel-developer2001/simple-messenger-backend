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
import { ChannelMembersService } from './channel-members.service';
import { CreateChannelMemberDto } from './dto/create-channel-member.dto';

@Controller('channel-members')
export class ChannelMembersController {
  constructor(private readonly channelMembersService: ChannelMembersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('join')
  joinedInChannel(
    @Body() createChannelMembeerDto: CreateChannelMemberDto,
    @User() userId: number,
  ) {
    return this.channelMembersService.joined(createChannelMembeerDto, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelMembersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check/:id')
  checkMember(@Param('id') id: string, @User() userId: number) {
    return this.channelMembersService.check(+id,userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('exit/:id')
  exitFromChannel(@Param('id') id: string, @User() userId: number) {
    return this.channelMembersService.exit(+id, userId);
  }
}

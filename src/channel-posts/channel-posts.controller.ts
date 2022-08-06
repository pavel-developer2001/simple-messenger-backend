import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { ChannelPostsService } from './channel-posts.service';
import { CreateChannelPostDto } from './dto/create-channel-post.dto';

@Controller('channel-posts')
export class ChannelPostsController {
  constructor(private readonly channelPostsService: ChannelPostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createChannelPostDto: CreateChannelPostDto,
    @User() userId: number,
  ) {
    return this.channelPostsService.create(createChannelPostDto, userId);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelPostsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelPostsService.remove(+id);
  }
}

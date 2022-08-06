import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPosgresConfig } from './config/postgres.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { ChatModule } from './chat/chat.module';
import { ChatMessagesModule } from './chat-messages/chat-messages.module';
import { ChannelModule } from './channel/channel.module';
import { ChannelPostsModule } from './channel-posts/channel-posts.module';
import { ChannelMembersModule } from './channel-members/channel-members.module';
import { ChatMembersModule } from './chat-members/chat-members.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPosgresConfig,
    }),
    UserModule,
    AuthModule,
    TokenModule,
    ChatModule,
    ChatMessagesModule,
    ChannelModule,
    ChannelPostsModule,
    ChannelMembersModule,
    ChatMembersModule,
  ],
})
export class AppModule {}

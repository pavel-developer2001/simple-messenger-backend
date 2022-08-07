import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatMessagesService } from './chat-messages.service';
import { Socket, Server } from 'socket.io';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';

@WebSocketGateway({ cors: true })
export class ChatMessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatMessagesService: ChatMessagesService) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatMessagesGateway');

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage('chatMessageServer')
  async handleMessage(
    client: Socket,
    @MessageBody() createChatMessageDto: CreateChatMessageDto,
    // @User() userId: number,
  ) {
    const create = await this.chatMessagesService.create(createChatMessageDto);
    this.server.emit('chatMessageClient', create);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('connected', client.id);
    this.logger.log(`Client connected: ${client.id}`);
  }
}

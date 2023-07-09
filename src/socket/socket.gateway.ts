import { WebSocketGateway } from '@nestjs/websockets';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: any;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string) {
    this.server.emit('events', data);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('User connected');
  }

  handleDisconnect(client: any) {
    console.log('User disconnected');
  }

  afterInit(server: any) {
    console.log('Socket is live');
  }
}

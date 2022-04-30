import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() userName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(userName);

    socket.emit('hello_user', `hello ${userName}`);
    return `hello ${userName}`;
  }
}

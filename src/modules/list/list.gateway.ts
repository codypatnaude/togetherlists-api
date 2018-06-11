import {WebSocketGateway, SubscribeMessage, WsResponse, WebSocketServer, WsException, OnGatewayConnection} from '@nestjs/websockets';
import {forwardRef, Inject} from '@nestjs/common';
import {UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import * as SocketIO from 'socket.io';
import { ListService } from './list.service';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway()
export class ListGateway implements OnGatewayConnection {

  constructor(
    @Inject(forwardRef(() => ListService))
    private listService: ListService,
    private authService: AuthService,
  ) {}

  @WebSocketServer()
  private server: any;
  rooms: number[];

  handleConnection(socket: SocketIO.socket){
    console.log('new connection from ', socket.client.id);
    socket.emit('message', 'hello!');
    socket.emit('auth.request', 'Please send auth.response');
  }

  @SubscribeMessage('auth.response')
  async verifyAuthentication(client: SocketIO.socket, token){
    try{
      const user = await this.authService.verifyAuthToken(token);
    }catch (e){
      this.server.disconnect();
    }
    this.server.emit('connected');
  }

  @SubscribeMessage('message')
  onMessage(client, data: string): WsResponse<any> {
    console.log('recieved a message!');
    console.log(data);
    return {event: 'message', data: data + ' received'};
  }

  @SubscribeMessage('list.request')
  onList(client: SocketIO.socket, data: any): WsResponse<any>{
    console.log('list request!');
    const listId = data.id;
    this.changeRooms(client, `LIST_ROOM ${listId}`);
    return {event: 'list.response', data: 'Added to room'};
  }

  publishUpdate(listId, item){
    console.log('attempting to publish');
    console.log(item);
    // this.server.emit('message', 'This is a test');
    this.server.to(`LIST_ROOM ${listId}`).emit('list.detail', item);
  }

  private changeRooms(client: SocketIO.socket, newRoom){
    /*client.rooms.forEach((room: string) => {
      if (room.indexOf('LIST_ROOM') === 0){
        client.leave(room);
      }
    });*/
    client.join(newRoom);
  }

  private roomExists(roomName: string){
    const room = this.server.rooms[roomName];
    return room.length > 0;
  }
}
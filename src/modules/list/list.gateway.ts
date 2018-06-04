import {WebSocketGateway, SubscribeMessage, WsResponse, WebSocketServer, WsException, OnGatewayConnection} from '@nestjs/websockets';
import {forwardRef, Inject} from '@nestjs/common';
import {UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import * as SocketIO from 'socket.io';
import { ListService } from './list.service';

@WebSocketGateway()
export class ListGateway implements OnGatewayConnection {

  constructor(
    @Inject(forwardRef(() => ListService))
    private listService: ListService,
  ) {}

  @WebSocketServer()
  private server: any;
  rooms: number[];

  @SubscribeMessage('message')
  onMessage(client, data: string): WsResponse<any> {
    console.log('recieved a message!');
    console.log(data);
    return {event: 'message', data: data + ' received'};
  }

  @SubscribeMessage('list.request')
  async onList(client: SocketIO.socket, data: any): Promise<WsResponse<any>>{
    const listId = data.id;
    const list = await this.listService.findOne(listId);
    return {event: 'list.response', data: list};
  }

  publishUpdate(){
    console.log('attempting to publish');
    this.server.emit('message', 'This is a test');
  }

  handleConnection(socket: SocketIO.socket){
    console.log('new connection from ', socket.client.id);
    socket.broadcast.emit('message', {data: 'Someone Connected!'});
  }
}
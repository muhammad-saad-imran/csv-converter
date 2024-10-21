import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { map, of } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { Event } from 'src/type';
import { WebsocketService } from 'src/websocket/websocket.service';

@WebSocketGateway(80)
export class WebsocketGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private websocketService: WebsocketService) {}

  @SubscribeMessage(Event.CONVERT)
  async handleConversion(client: Socket, payload: any) {
    const jobId = await this.websocketService.handleConversion(
      client.id,
      payload,
    );
    return { event: Event.JOB, data: { jobId } };
  }

  emitEvent(clientId: string, event: string, data: any) {
    return this.server.to(clientId).emit(event, data);
  }
}

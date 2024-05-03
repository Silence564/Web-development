import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';

@WebSocketGateway(4020)
export class WebGateway{
    @WebSocketServer() server;
     @SubscribeMessage('addBroker')
     handleEvent(@MessageBody() message: string): void{
        this.server.emit('newBroker', true);
    }
      @SubscribeMessage('startTrade')
      emitTrade(@MessageBody() message: string): void {
        this.server.emit('tradeStarted', []);
    }
}
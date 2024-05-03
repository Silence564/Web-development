import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebGateway } from './gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WebGateway],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { CsvModule } from 'src/csv/csv.module';
import { WebsocketService } from './websocket.service';
import { BullModule } from '@nestjs/bullmq';
import { CSV_QUEUE } from 'src/constants';

@Module({
  imports: [BullModule.registerQueue({ name: CSV_QUEUE })],
  providers: [WebsocketGateway, WebsocketService],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}

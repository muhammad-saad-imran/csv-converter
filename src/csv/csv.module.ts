import { Module } from '@nestjs/common';
import { CsvQueueEventListener } from 'src/csv/csv.event-listener';
import { CsvProcessor } from 'src/csv/csv.processor';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [WebsocketModule],
  providers: [CsvProcessor, CsvQueueEventListener],
  exports: [CsvProcessor],
})
export class CsvModule {}

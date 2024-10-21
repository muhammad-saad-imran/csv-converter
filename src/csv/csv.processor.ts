import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { json2csv } from 'json-2-csv';
import { CSV_QUEUE } from 'src/constants';
import { Event } from 'src/type';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Processor(CSV_QUEUE)
export class CsvProcessor extends WorkerHost {
  async process(job: Job, token?: string): Promise<any> {
    try {
      const jsonData = JSON.parse(job.data.input);
      return {
        clientId: job.data.clientId,
        data: { success: true, csv: json2csv(jsonData) },
      };
    } catch (error) {
      return {
        clientId: job.data.clientId,
        data: { success: false, error: error.message },
      };
    }
  }
}

import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { CSV_QUEUE } from 'src/constants';

@Injectable()
export class WebsocketService {
  constructor(@InjectQueue(CSV_QUEUE) private csvQueue: Queue) {}

  async handleConversion(clientId: string, data: any) {
    const job = await this.csvQueue.add('convert', { clientId, input: data });
    return job.id;
  }
}

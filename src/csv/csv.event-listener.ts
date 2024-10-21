import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { CSV_QUEUE } from 'src/constants';
import { Event } from 'src/type';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@QueueEventsListener(CSV_QUEUE)
export class CsvQueueEventListener extends QueueEventsHost {
  constructor(private websocketGateway: WebsocketGateway) {
    super();
  }

  @OnQueueEvent('completed')
  onCompleted({
    jobId,
    returnvalue,
  }: {
    jobId: string;
    returnvalue: { clientId: string; data: object };
    prev?: string;
  }) {
    this.websocketGateway.emitEvent(
      returnvalue.clientId,
      Event.JOB_COMPLETE,
      returnvalue.data,
    );
    console.info(`--> Job with id: ${jobId} completed`);
  }

  @OnQueueEvent('failed')
  onFailed({ jobId, failedReason }: { jobId: string; failedReason: string }) {
    console.error(`--> Job with id: ${jobId} failed, reason: ${failedReason}`);
  }
}

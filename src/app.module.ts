import { Module } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { CsvModule } from './csv/csv.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    WebsocketModule,
    CsvModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          connection: {
            host: configService.getOrThrow('REDIS_HOST'),
            port: configService.getOrThrow('REDIS_PORT'),
            password: configService.getOrThrow('REDIS_PASS'),
          },
          defaultJobOptions: {
            removeOnComplete: false, 
            removeOnFail: false,
          },
        };
      },
    }),
  ],
})
export class AppModule {}

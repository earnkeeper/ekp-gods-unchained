import { EkConfigService, SdkModule } from '@earnkeeper/ekp-sdk-nestjs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardModule } from './feature/card/card.module';
import { CollectionModule } from './feature/collection/collection.module';
import { MarketModule } from './feature/market/market.module';
import { QueueModule } from './shared/queue/queue.module';

export const MODULE_DEF = {
  imports: [
    MongooseModule.forRootAsync({ useClass: EkConfigService }),
    CollectionModule,
    CardModule,
    MarketModule,
    QueueModule,
    SdkModule,
  ],
};

@Module(MODULE_DEF)
export class WorkerModule {}

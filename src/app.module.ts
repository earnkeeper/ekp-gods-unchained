import { EkConfigService, SdkModule } from '@earnkeeper/ekp-sdk-nestjs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardModule } from './feature/card/card.module';
import { CollectionModule } from './feature/collection/collection.module';

export const MODULE_DEF = {
  imports: [
    MongooseModule.forRootAsync({ useClass: EkConfigService }),
    SdkModule,
    CollectionModule,
    CardModule,
  ],
};

@Module(MODULE_DEF)
export class AppModule {}

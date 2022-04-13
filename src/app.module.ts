import { EkConfigService, SdkModule } from '@earnkeeper/ekp-sdk-nestjs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardModule } from './feature/cards/card.module';
import { CollectionModule } from './feature/collection/collections.module';


export const MODULE_DEF = {
  imports: [
    MongooseModule.forRootAsync({ useClass: EkConfigService }),
    CardModule,
    SdkModule,
    CollectionModule,
  ],
};

@Module(MODULE_DEF)
export class AppModule {}

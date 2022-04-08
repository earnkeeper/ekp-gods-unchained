import { EkConfigService, SdkModule } from '@earnkeeper/ekp-sdk-nestjs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryModule } from './feature/history/history.module';


export const MODULE_DEF = {
  imports: [
    MongooseModule.forRootAsync({ useClass: EkConfigService }),
    HistoryModule,
    SdkModule,
  ],
};

@Module(MODULE_DEF)
export class AppModule {}

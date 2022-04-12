import { EkConfigService, SdkModule } from '@earnkeeper/ekp-sdk-nestjs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryModule } from './feature/history/history.module';
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

export const MODULE_DEF = {
  imports: [
    MongooseModule.forRootAsync({ useClass: EkConfigService }),
<<<<<<< Updated upstream
    HistoryModule,
=======
     HistoryModule,
>>>>>>> Stashed changes
    SdkModule,
  ],
};

@Module(MODULE_DEF)
export class AppModule {}

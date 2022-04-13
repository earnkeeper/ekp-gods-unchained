import { Module } from '@nestjs/common';
import { ApiModule } from '../../shared/api';
import { DbModule } from '../../shared/db';
import { CollectionController } from './collections.contoller';
import { CollectionService } from './collections.service';

@Module({
  imports: [ApiModule, DbModule],

  providers: [CollectionController, CollectionService],
})
export class CollectionModule {}

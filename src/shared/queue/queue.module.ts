import { Module } from '@nestjs/common';
import { ApiModule } from '../api';
import { DbModule } from '../db';
import { GameModule } from '../game/game.module';
import { AssetProcessor, OrderProcessor } from './processors';
import { QueueEventsService } from './queue-events.service';

@Module({
  imports: [ApiModule, DbModule, GameModule],
  providers: [OrderProcessor, AssetProcessor, QueueEventsService],
})
export class QueueModule {}

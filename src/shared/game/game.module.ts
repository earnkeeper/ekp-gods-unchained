import { Module } from '@nestjs/common';
import { ApiModule } from '../api';
import { DbModule } from '../db';
import { GameService } from './game.service';

@Module({
  imports: [ApiModule, DbModule],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}

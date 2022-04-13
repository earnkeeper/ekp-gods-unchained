import { Module } from '@nestjs/common';
import { ApiModule } from '../../shared/api';
import { DbModule } from '../../shared/db';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [ApiModule, DbModule],
  providers: [CardService , CardController],
})
export class CardModule {}

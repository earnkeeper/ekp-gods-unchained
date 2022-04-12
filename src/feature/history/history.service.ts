import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
//import moment from 'moment';
import { HistoryDto } from 'src/shared/api/dto/history.dto';
import { CardForm } from 'src/util/form';
import { ApiService} from '../../shared/api';
import { HistoryDocument } from './ui/history.document';

@Injectable()
export class HistoryService {
  constructor(
    private coingeckoService: CoingeckoService,
    private apiService: ApiService,
  ) {}

  async getHistoryDocuments(
    form: CardForm,
  ): Promise<HistoryDocument[]> {
  
    const historyDto = await this.apiService.fetchHistory(
    );

    //testing done here
    //const cardDto = await this.apiService.fetchCards(
    //);
    //console.log(cardDto);
    
    const protoDto = await this.apiService.fetchProto(
      );
      console.log(protoDto);
  

    return this.mapDocuments(historyDto, form);
  }

  async mapDocuments(
    historyDto: HistoryDto,
    form: CardForm,
  ) {
    //const now = moment().unix();
    const documents: HistoryDocument[] = historyDto.battles.map(
      (battles) => {
        return {
          
          id: battles.id,
          createdDate: battles.created_date,
          currentStreak: battles.current_streak,
          manaCap: battles.mana_cap,
          matchType: battles.match_type,
          player1: battles.player_1,
          player1RatingFinal: battles.player_1_rating_final,
          player1RatingInitial : battles.player_1_rating_initial,
          player2: battles.player_2,
          player2RatingFinal : battles.player_2_rating_final,
          player2RatingInitial: battles.player_2_rating_initial,
          rShares: battles.rshares,
          ruleSet: battles.ruleset,
          winner: battles.winner,
        };
      },
    );

    return documents;
  }
}

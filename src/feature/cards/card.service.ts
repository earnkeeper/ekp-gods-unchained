import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
//import moment from 'moment';

import { CardForm } from 'src/util/form';
import { ApiService, CardDto} from '../../shared/api';
import { CardDocument } from './ui/cards.document';

@Injectable()
export class CardService {
  constructor(
    private apiService: ApiService,
  ) {}

  async getCardDocuments(
    form: CardForm,
  ): Promise<CardDocument[]> {
  
    const cardDto = await this.apiService.fetchCards(form.playerName
    );

    return this.mapDocuments(form, cardDto);
  }

  async mapDocuments(
    form: CardForm,
    cardsDto: CardDto,
  ) {

    const documents: CardDocument[] = cardsDto.records.map(
      (records) => {
        return {
          id: records.id,
          user: records.user,
          proto: records.proto,
          purity: records.purity,
        };
      },
    );
    return documents;
  }
}

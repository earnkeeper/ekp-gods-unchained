import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
//import moment from 'moment';
import { CardDto } from 'src/shared/api/dto/card.dto';
import { ApiService} from '../../shared/api';
import { CardDocument } from './ui/cards.document';

@Injectable()
export class CardService {
  constructor(
    private coingeckoService: CoingeckoService,
    private apiService: ApiService,
  ) {}

  async getCardDocuments(
    form: any,
    cardsDto: any,
  ): Promise<any> {
  
    const cardDto = await this.apiService.fetchCards(
    );
    console.log(cardDto);

    return this.mapDocuments(cardsDto, form);
  }

  async mapDocuments(
    cardsDto: CardDto,
    form: any,
  ) {

    const documents = cardsDto.records.map(
      (battles) => {
        return {
          id: battles.id,
        };
      },
    );
    return documents;
  }
}

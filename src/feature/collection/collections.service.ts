import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import moment from 'moment';
import { ApiService, CardDto } from 'src/shared/api';
import { CardCollectionDto } from 'src/shared/api/dto/card-collection.dto';
import { DEFAULT_CARD_FORM } from 'src/util';
import { CardForm } from 'src/util/form';
import { CardService } from '../cards/card.service';
import { CardDocument } from '../cards/ui/cards.document';
import { CollectionDocument } from './ui/collections.document';

@Injectable()
export class CollectionService {
  constructor(
    private apiService: ApiService,
  ) {}

  async getCollectionDocuments(
    form: CardForm,
  ): Promise<CollectionDocument[]> {

   const cards =  await this.apiService.fetchCards(form.playerName)
    console.log(cards);

    const protoDto = await this.apiService.fetchProto();

    

    const cadMap =  _.map(cards, (p, key) => {
      
      cards.records

     });

    }
    

    return this.mapDocuments(collectionDto);
  }

  async mapDocuments(
    collectionDto: CardCollectionDto,
  ) {

    const documents: CollectionDocument[] = collectionDto.records.map(
      (records) => {
        return {
          id: records.id,
          type: records.type,
          name: records.name,
          effect: records.effect,
          god: records.god,
          rarity: records.rarity,
          mana: records.mana,
          recordType: records.type,
          set: records.set,
          collectable: records.collectable,
          live: records.live,
          artId: records.art_id,
          libId: records.lib_id,
        };
      },
    );
    return documents;
  }
}



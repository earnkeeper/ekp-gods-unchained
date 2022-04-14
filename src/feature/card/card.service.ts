import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { ApiService, CardDto } from 'src/shared/api';
import { CardMapper, Prototype } from 'src/shared/game';
import { CardDocument } from './ui/card.document';

@Injectable()
export class CardService {
  constructor(private apiService: ApiService) {}

  async getCollectionDocuments(
    playerAddress: string,
  ): Promise<CardDocument[]> {
    if (!playerAddress) {
      return [];
    }

    const cards = await this.apiService.fetchCards(playerAddress);

    const protos = await this.apiService.fetchProtos();

    const prototypes = protos.map((proto) => CardMapper.mapToPrototype(proto));

    const protoMap = _.chain(prototypes)
      .keyBy('id')
      .mapKeys((value, key) => {
        return Number(key);
      })
      .value();
    return this.mapDocuments(cards, protoMap);
  }

  async mapDocuments(cardDtos: CardDto[], protoMap: Record<number, Prototype>) {
    const documents: CardDocument[] = cardDtos.map((cardDto) => {
      const card = CardMapper.mapToCard(cardDto, protoMap);

      return {
        ...card.prototype,
        id: card.prototype.id?.toString(),
        cardImg: `https://images.godsunchained.com/art2/500/${card.prototype.id?.toString()}.webp`,
      };
    });
  
    return documents;
  }
}

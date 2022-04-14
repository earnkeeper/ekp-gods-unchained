import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class CardDocument extends DocumentDto {
  constructor(properties: CardDocument) {
    super(properties);
  }
  readonly id: string;
  readonly name: string;
  readonly god: string;
  readonly rarity: string;
  readonly mana: number;
  readonly set: string;
  readonly cardImg: string;
  readonly collectable: boolean;
  readonly live: boolean;
  readonly artId: string;
  readonly libId: string;
}

import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class CollectionDocument extends DocumentDto {
  constructor(properties: CollectionDocument) {
    super(properties);
  }
    readonly id: string;
    readonly name: string;
    readonly effect: string;
    readonly god: string;
    readonly rarity: string;
    readonly mana: number;
    readonly recordType: number;
    readonly set: number
    readonly collectable: boolean;
    readonly live: boolean;
    readonly artId: string;
    readonly libId: string;
}
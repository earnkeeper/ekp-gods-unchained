import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class CardDocument extends DocumentDto {
  constructor(properties: CardDocument) {
    super(properties);
  }
  readonly id: string;
  readonly user: string;
  readonly proto: number;
  readonly purity: number;

}


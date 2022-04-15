import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class MarketDocument extends DocumentDto {
  constructor(properties: MarketDocument) {
    super(properties);
  }
  readonly dummy: string;
}

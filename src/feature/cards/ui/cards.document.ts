import { DocumentDto } from '@earnkeeper/ekp-sdk';
import { RecordsDto } from 'src/shared/api/dto/card.dto';

export class CardDocument extends DocumentDto {
  constructor(properties: CardDocument) {
    super(properties);
  }
  readonly total: number;
  readonly page: number;
  readonly perPage: number;
  readonly records: RecordsDto[];
  readonly id : string;
  readonly int64: number;
  readonly valid: boolean;
  readonly user: string; 
  readonly proto: number;
  readonly purity: number;

}


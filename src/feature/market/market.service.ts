import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { ApiService } from '../../shared/api';
import { MarketDocument } from './ui/market.document';

@Injectable()
export class MarketService {
  constructor(private apiService: ApiService) {}

  async getCardDocuments(): Promise<MarketDocument[]> {
    const orders = await this.apiService.getOrders();

    console.log(
      _.chain(orders)
        .map((it) => it.status)
        .uniq()
        .value(),
    );

    return [];
  }
}

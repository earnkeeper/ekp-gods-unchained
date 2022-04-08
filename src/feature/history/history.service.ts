import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import { ApiService } from '../../shared/api';
import { HistoryDocument } from './ui/history.document';

@Injectable()
export class HistoryService {
  constructor(
    private coingeckoService: CoingeckoService,
    private apiService: ApiService,
  ) {}

  async getHistoryDocuments(): Promise<HistoryDocument[]> {
  
    return [{ id: 'demo', name: 'demo'}];
  }

}

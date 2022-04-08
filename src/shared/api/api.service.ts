import { AbstractApiService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import axios from 'axios-https-proxy-fix';
import { validate } from 'bycontract';
import { HistoryDto } from './dto/history.dto';

//URL for API
const BASE_URL = 'https://api2.splinterlands.com';
const STEEM_BASE_URL = 'https://api.steemmonsters.io';
const CACHE_BASE_URL = 'https://cache-api.splinterlands.com';

@Injectable()
export class ApiService extends AbstractApiService {
  private readonly proxy: { host: string; port: number };

  constructor() {
    super({
      name: 'SplinterlandsApiService',
    });

    if (process.env.PROXY_HOST) {
      this.proxy = {
        host: process.env.PROXY_HOST,
        port: !!process.env.PROXY_PORT ? Number(process.env.PROXY_PORT) : 3128,
      };
    }
  }

  
  async fetchHistory(
    playerName: string,
  ): Promise<HistoryDto> {
    const url = `${BASE_URL}/battle/history?player=${playerName}`;
    return this.handleCall({ url, ttl: 15 }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });

      return response.data;
    });
  }
}

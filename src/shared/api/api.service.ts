import { AbstractApiService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import axios from 'axios-https-proxy-fix';
import { validate } from 'bycontract';
import { CardDto } from './dto';
import { HistoryDto } from './dto/history.dto';
import { ProtoDto } from './dto/proto.dto';

//URL for API
const BASE_URL = 'https://api.godsunchained.com/v0/';


@Injectable()
export class ApiService extends AbstractApiService {
  private readonly proxy: { host: string; port: number };

  constructor() {
    super({
      name: 'GodsUnchainedApiService',
    });

    if (process.env.PROXY_HOST) {
      this.proxy = {
        host: process.env.PROXY_HOST,
        port: !!process.env.PROXY_PORT ? Number(process.env.PROXY_PORT) : 3128,
      };
    }
  }

  
  async fetchCards(
  ): Promise<CardDto> {
    const url = `${BASE_URL}card?user=0xf096e0d009dd024e5cff8075a7418b5712f0cc7d`;
    return this.handleCall({ url, ttl: 15 }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });
      return response.data;
    });
  }

  async fetchHistory(

  ): Promise<HistoryDto> {
    const url = `${BASE_URL}card?user=0xf096e0d009dd024e5cff8075a7418b5712f0cc7d`;
    return this.handleCall({ url, ttl: 15 }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });
      return response.data;
    });
  }

  async fetchProto(

    ): Promise<ProtoDto> {
      const url = `${BASE_URL}proto?page=3&perPage=100`;
      return this.handleCall({ url, ttl: 15 }, async () => {
        const response = await axios.get(url, { proxy: this.proxy });
        return response.data;
      });
    }
}

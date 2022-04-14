import { AbstractApiService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import axios from 'axios-https-proxy-fix';
import { CardDto } from './dto';
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

  async fetchCards(playerAddress:string): Promise<CardDto[]> {
    const url = `${BASE_URL}card?user=${playerAddress}`;

    return this.handleCall({ url, ttl: 15 }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });
      return response.data?.records ?? [];
    });
  }

  async fetchAllCards(): Promise<CardDto[]> {
    const url = `${BASE_URL}card?perPage=105315`;

    return this.handleCall({ url, ttl: 15 }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });
      return response.data?.records ?? [];
    });
  }

  async fetchAllProtos(): Promise<ProtoDto[]> {
    const url = `${BASE_URL}proto?perPage=10000`;

    return this.handleCall({ url, ttl: 86400 }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });
      return response.data?.records ?? [];
    });
  }
  async fetchProtos(): Promise<ProtoDto[]> {
    const url = `${BASE_URL}proto?perPage=10000`;
    return this.handleCall({ url, ttl: 86400 }, async () => {
      const response = await axios.get(url, { proxy: this.proxy });
      return response.data?.records ?? [];
    });
  }
}

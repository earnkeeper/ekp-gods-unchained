import {
  ApmService,
  logger,
  SCHEDULER_QUEUE,
} from '@earnkeeper/ekp-sdk-nestjs';
import { Process, Processor } from '@nestjs/bull';
import { ApiService } from '../../api';
import { AssetRepository } from '../../db/asset/asset.repository';
import { OrderRepository } from '../../db/order/order.repository';
import { PROCESS_MARKET } from '../constants';

@Processor(SCHEDULER_QUEUE)
export class MarketProcessor {
  constructor(
    private apiService: ApiService,
    private apmService: ApmService,
    private assetRepository: AssetRepository,
    private orderRepository: OrderRepository,
  ) {}

  @Process(PROCESS_MARKET)
  async processMarket() {
    try {
      console.log('starting');
      const orders = await this.orderRepository.find();

      console.log(orders);
    } catch (error) {
      this.apmService.captureError(error);
      logger.error(error);
    }
  }
}

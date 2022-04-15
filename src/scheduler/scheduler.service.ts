import { SCHEDULER_QUEUE } from '@earnkeeper/ekp-sdk-nestjs';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bull';
import { RedisService } from 'nestjs-redis';
import {
  PROCESS_ASSETS,
  PROCESS_MARKET,
  PROCESS_ORDERS,
} from '../shared/queue/constants';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectQueue(SCHEDULER_QUEUE) private queue: Queue,
    private redisService: RedisService,
  ) {}

  async onModuleInit() {
    await this.queue.empty();
    await this.queue.clean(0, 'wait');
    await this.queue.clean(0, 'active');
    await this.queue.clean(0, 'delayed');
    await this.queue.clean(0, 'paused');

    const client = this.redisService.getClient('DEFAULT_CLIENT');
    await client.flushall();
    await client.flushdb();

    await this.addJob(PROCESS_ORDERS, {}, 5000, PROCESS_ORDERS, [
      'staging',
      'production',
    ]);
    await this.addJob(PROCESS_ASSETS, {}, 5000, PROCESS_ASSETS, [
      'staging',
      'production',
    ]);
    await this.addJob(PROCESS_MARKET, {}, 5000, PROCESS_MARKET, [
      'staging',
      'production',
    ]);
  }

  @Cron('0 */10 * * * *')
  every10minutes() {
    this.addJob(PROCESS_ORDERS, {}, 5000, PROCESS_ORDERS, [
      'staging',
      'production',
    ]);
    this.addJob(PROCESS_ASSETS, {}, 5000, PROCESS_ASSETS, [
      'staging',
      'production',
    ]);
    this.addJob(PROCESS_MARKET, {}, 5000, PROCESS_MARKET, [
      'staging',
      'production',
    ]);
  }

  private async addJob<T>(
    jobName: string,
    data?: T,
    delay = 0,
    jobId?: string,
    environments?: string[],
  ) {
    if (
      (!Array.isArray(environments) || environments.length === 0) &&
      process.env.NODE_ENV !== 'production'
    ) {
      return;
    }

    if (!environments.includes(process.env.NODE_ENV)) {
      return;
    }

    try {
      if (!!jobId) {
        await this.queue.add(jobName, data, {
          jobId,
          removeOnComplete: true,
          removeOnFail: true,
          delay,
        });
      } else {
        await this.queue.add(jobName, data, {
          removeOnComplete: true,
          removeOnFail: true,
          delay,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

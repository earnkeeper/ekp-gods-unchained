import {
  ApmService,
  logger,
  SCHEDULER_QUEUE,
} from '@earnkeeper/ekp-sdk-nestjs';
import { Process, Processor } from '@nestjs/bull';
import _ from 'lodash';
import { ApiService } from '../../api';
import { AssetRepository } from '../../db/asset/asset.repository';
import { AssetMapper } from '../../game/mappers/asset.mapper';
import { PROCESS_ASSETS } from '../constants';

const PAGE_SIZE = 200;

@Processor(SCHEDULER_QUEUE)
export class AssetProcessor {
  constructor(
    private apiService: ApiService,
    private apmService: ApmService,
    private assetRepository: AssetRepository,
  ) {}

  @Process(PROCESS_ASSETS)
  async processAssets() {
    try {
      try {
        const latestAsset = await this.assetRepository.findLatest();

        let latestUpdatedTimestamp = latestAsset?.updatedAt;

        while (true) {
          const assetDtos = await this.apiService.getAssets(
            latestUpdatedTimestamp,
            PAGE_SIZE,
          );

          if (!assetDtos?.length) {
            break;
          }

          const assets = _.chain(assetDtos)
            .map((assetDto) => AssetMapper.mapToAsset(assetDto))
            .value();

          await this.assetRepository.save(assets);

          if (assets.length < PAGE_SIZE) {
            break;
          }

          latestUpdatedTimestamp = _.chain(assets)
            .map((asset) => asset.updatedAt)
            .max()
            .value();
        }
      } catch (error) {
        this.apmService.captureError(error);
        logger.error(error);
      }
    } catch (error) {
      this.apmService.captureError(error);
      logger.error(error);
    }
  }
}

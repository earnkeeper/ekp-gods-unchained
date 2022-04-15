import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'bycontract';
import _ from 'lodash';
import { Model } from 'mongoose';
import { Asset } from './asset.schema';

@Injectable()
export class AssetRepository {
  constructor(
    @InjectModel(Asset.name)
    public orderModel: Model<Asset>,
  ) {}

  async findLatest(): Promise<Asset> {
    const results = await this.orderModel
      .find()
      .sort('timestamp')
      .limit(1)
      .exec();

    if (!results?.length) {
      return undefined;
    }

    return results[0];
  }

  async save(models: Asset[]): Promise<void> {
    validate([models], ['Array.<object>']);

    if (models.length === 0) {
      return;
    }

    await this.orderModel.bulkWrite(
      models.map((model) => {
        validate(model, 'object');

        return {
          updateOne: {
            filter: {
              id: model.id,
            },
            update: {
              $set: _.pick(model, [
                'id',
                'status',
                'proto',
                'quality',
                'updatedAt',
              ]),
            },
            upsert: true,
          },
        };
      }),
    );
  }
}

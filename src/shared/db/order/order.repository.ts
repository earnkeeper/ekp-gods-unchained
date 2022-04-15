import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'bycontract';
import _ from 'lodash';
import { Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name)
    public orderModel: Model<Order>,
  ) {}

  async findLatest(): Promise<Order> {
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

  async save(orders: Order[]): Promise<void> {
    validate([orders], ['Array.<object>']);

    if (orders.length === 0) {
      return;
    }

    await this.orderModel.bulkWrite(
      orders.map((model) => {
        validate(model, 'object');

        return {
          updateOne: {
            filter: {
              id: model.id,
            },
            update: {
              $set: _.pick(model, [
                'id',
                'user',
                'tokenId',
                'quantity',
                'name',
                'buyTokenAddress',
                'buyTokenDecimals',
                'buyTokenQuantity',
                'amountSold',
                'timestamp',
                'updatedTimestamp',
                'expirationTimestamp',
              ]),
            },
            upsert: true,
          },
        };
      }),
    );
  }
}

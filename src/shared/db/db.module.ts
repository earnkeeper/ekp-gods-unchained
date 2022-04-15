import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema, AssetRepository } from './asset';
import { Order, OrderSchema } from './order';
import { OrderRepository } from './order';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asset.name, schema: AssetSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [AssetRepository, OrderRepository],
  exports: [AssetRepository, OrderRepository],
})
export class DbModule {}

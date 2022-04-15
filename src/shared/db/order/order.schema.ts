import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderSchema = Order & Document;

@Schema()
export class Order {
  @Prop()
  readonly id: number;

  @Prop()
  readonly user: string;

  @Prop()
  readonly tokenId: string;

  @Prop()
  readonly quantity: number;

  @Prop()
  readonly name: string;

  @Prop()
  readonly buyTokenAddress: string;

  @Prop()
  readonly buyTokenDecimals: number;

  @Prop()
  readonly buyTokenQuantity: string;

  @Prop()
  readonly amountSold: number;

  @Prop()
  readonly timestamp: string;

  @Prop()
  readonly updatedTimestamp: string;

  @Prop()
  readonly expirationTimestamp: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order)
  .index({ id: 1 }, { unique: true })
  .index({ updatedTimestamp: 1 });

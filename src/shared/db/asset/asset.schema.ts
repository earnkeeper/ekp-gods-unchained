import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssetSchema = Asset & Document;

@Schema()
export class Asset {
  @Prop()
  readonly id: string;

  @Prop()
  readonly token_address: string;

  @Prop()
  readonly token_id: string;

  @Prop()
  readonly user: string;

  @Prop()
  readonly status: string;

  @Prop()
  readonly uri: string;

  @Prop()
  readonly name: string;

  @Prop()
  readonly description: string;

  @Prop()
  readonly god: string;

  @Prop()
  readonly set: string;

  @Prop()
  readonly mana: number;

  @Prop()
  readonly type: string;

  @Prop()
  readonly image: string;

  @Prop()
  readonly proto: number;

  @Prop()
  readonly tribe: string;

  @Prop()
  readonly attack: number;

  @Prop()
  readonly effect: string;

  @Prop()
  readonly health: number;

  @Prop()
  readonly rarity: string;

  @Prop()
  readonly quality: string;

  @Prop()
  readonly createdAt: string;

  @Prop()
  readonly updatedAt: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset)
  .index({ id: 1 }, { unique: true })
  .index({ updatedTimestamp: 1 });

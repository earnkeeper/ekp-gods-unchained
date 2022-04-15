import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssetSchema = Asset & Document;

@Schema({ collection: 'assets_v2' })
export class Asset {
  @Prop()
  readonly id: string;

  @Prop()
  readonly status: string;

  @Prop()
  readonly proto: number;

  @Prop()
  readonly quality: string;

  @Prop()
  readonly updatedAt: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset)
  .index({ id: 1 }, { unique: true })
  .index({ updatedAt: 1 });

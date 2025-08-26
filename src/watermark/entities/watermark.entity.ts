import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WatermarkDocument = HydratedDocument<Watermark>;

@Schema()
export class Watermark {
  @Prop({ required: true })
  text: string;

  @Prop()
  picture?: string;
}

export const WatermarkSchema = SchemaFactory.createForClass(Watermark);

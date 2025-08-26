import { PartialType } from '@nestjs/mapped-types';
import { CreateWatermarkDto } from './create-watermark.dto';

export class UpdateWatermarkDto extends PartialType(CreateWatermarkDto) {}

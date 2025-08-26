import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWatermarkDto {
  @ApiProperty({
    type: 'string',
    description: 'Text to be used as watermark',
    example: 'Sample Watermark',
  })
  @IsString()
  text: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file for upload',
    required: false,
  })
  picture?: any;
}

import { Module } from '@nestjs/common';
import { WatermarkService } from './watermark.service';
import { WatermarkController } from './watermark.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Watermark, WatermarkSchema } from './entities/watermark.entity';
import { FileManagementService } from 'src/fileManagement/filemanagement.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Watermark.name, schema: WatermarkSchema },
    ]),
  ],
  controllers: [WatermarkController],
  providers: [WatermarkService, FileManagementService],
})
export class WatermarkModule {}

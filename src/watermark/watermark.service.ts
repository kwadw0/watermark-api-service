import { Injectable } from '@nestjs/common';
import { CreateWatermarkDto } from './dto/create-watermark.dto';
import { FileManagementService } from 'src/fileManagement/filemanagement.service';
import { InjectModel } from '@nestjs/mongoose';
import { Watermark, WatermarkDocument } from './entities/watermark.entity';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { addTextWatermark } from 'src/util/watermark';

@Injectable()
export class WatermarkService {
  constructor(
    @InjectModel(Watermark.name)
    private watermarkModel: Model<WatermarkDocument>,
    private readonly fileManagementService: FileManagementService,
  ) {}

  async create(
    createWatermarkDto: CreateWatermarkDto,
    picture: Express.Multer.File,
  ) {
    try {
      let pictureUrl: string | undefined;

      if (picture) {
        const bucket = 'watermark';
        const fileExt = picture.originalname.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;

        // Apply watermark to the image buffer
        const watermarkedBuffer = await addTextWatermark(
          picture.buffer,
          createWatermarkDto.text,
        );

        const filePath = await this.fileManagementService.uploadImage(
          { ...picture, buffer: watermarkedBuffer },
          bucket,
          fileName,
        );
        pictureUrl = await this.fileManagementService.getImageUrl(
          bucket,
          filePath,
        );
      }

      const created = new this.watermarkModel({
        text: createWatermarkDto.text,
        picture: pictureUrl,
      });

      return created.save();
    } catch (error) {
      console.error('Error creating watermark:', error);
      throw new Error('Error creating watermark');
    }
  }

  async findOne(id: string) {
    try {
      return this.watermarkModel.findById(id).exec();
    } catch (error) {
      console.error('Error finding watermark:', error);
      throw new Error('Error finding watermark');
    }
  }

  async findAll() {
    try {
      return this.watermarkModel.find().exec();
    } catch (error) {
      console.error('Error finding watermarks:', error);
      throw new Error('Error finding watermarks');
    }
  }
}

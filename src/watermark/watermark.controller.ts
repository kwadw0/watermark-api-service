import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { WatermarkService } from './watermark.service';
import { CreateWatermarkDto } from './dto/create-watermark.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('watermark')
export class WatermarkController {
  constructor(private readonly watermarkService: WatermarkService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('picture'))
  async create(
    @Body() createWatermarkDto: CreateWatermarkDto,
    @UploadedFile() picture: Express.Multer.File,
  ) {
    return this.watermarkService.create(createWatermarkDto, picture);
  }

  @Get()
  async findAll() {
    return this.watermarkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.watermarkService.findOne(id);
  }
}

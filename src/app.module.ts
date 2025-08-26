import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatermarkModule } from './watermark/watermark.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FileManagementModule } from './fileManagement/filemanagement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MongoDB_URI,
    ),
    WatermarkModule,
    FileManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

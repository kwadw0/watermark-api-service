import { Module } from '@nestjs/common';
import { FileManagementService } from './filemanagement.service';

@Module({
  providers: [FileManagementService],
  exports: [FileManagementService],
})
export class FileManagementModule {}

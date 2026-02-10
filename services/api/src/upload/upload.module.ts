import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { multerConfig } from '../config/storage.config';
import { NotesModule } from '../notes/notes.module';

@Module({
  imports: [MulterModule.register(multerConfig), NotesModule],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}

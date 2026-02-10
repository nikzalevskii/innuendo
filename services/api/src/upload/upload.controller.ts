import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IUploadedFile, UploadService } from './upload.service';

@Controller('api/notes')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('upload')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: IUploadedFile,

    @Body('title') title?: string,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const note = await this.uploadService.createNoteFromFile(file, title);

    return {
      message: 'File uploaded successfully. Processing started.',
      note: {
        id: note.id,
        title: note.title,
        status: note.status,
        sourceType: note.sourceType,
        filePath: note.filePath,
        mimeType: note.mimeType,
        fileSize: note.fileSize,
      },
    };
  }
}

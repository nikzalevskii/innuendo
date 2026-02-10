import { Injectable, BadRequestException } from '@nestjs/common';
import { unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { NotesService } from '../notes/notes.service';
import { mimeToSourceType } from '../config/storage.config';

export interface IUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

@Injectable()
export class UploadService {
  constructor(private notesService: NotesService) {}

  async createNoteFromFile(file: IUploadedFile, title?: string) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const sourceType = mimeToSourceType(file.mimetype);
    const noteTitle =
      title || this.generateTitle(file.originalname, sourceType);

    const metadata = {
      originalName: file.originalname,
      encoding: file.encoding,
    };

    const note = await this.notesService.createFromUpload(
      noteTitle,
      sourceType,
      file.path,
      file.mimetype,
      file.size,
      metadata,
    );

    // TODO: Добавить job в очередь для обработки (Этап 5)
    // await this.queueService.addProcessNoteJob(note.id);

    return note;
  }

  async deleteFile(filePath: string): Promise<void> {
    if (filePath && existsSync(filePath)) {
      await unlink(filePath);
    }
  }

  private generateTitle(filename: string, sourceType: string): string {
    const baseName = filename.replace(/\.[^/.]+$/, '');
    const prefix = sourceType === 'AUDIO' ? 'Аудио' : 'Изображение';
    const date = new Date().toLocaleDateString('ru-RU');
    return `${prefix}: ${baseName} (${date})`;
  }
}

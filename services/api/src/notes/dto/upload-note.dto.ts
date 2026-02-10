import { IsString, IsOptional, IsEnum } from 'class-validator';
import { SourceType } from '@prisma/client';

export class UploadNoteDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(SourceType)
  sourceType: SourceType;
}

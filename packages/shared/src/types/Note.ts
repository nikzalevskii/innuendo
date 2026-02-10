export type SourceType = "TEXT" | "AUDIO" | "IMAGE";
export type NoteStatus = "PROCESSING" | "READY" | "FAILED";
export type EntityType =
  | "PERSON"
  | "ORG"
  | "LOC"
  | "DATE"
  | "EVENT"
  | "PRODUCT"
  | "CONCEPT"
  | "OTHER";

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;

  sourceType: SourceType;
  filePath?: string;
  mimeType?: string;
  fileSize?: number;

  status: NoteStatus;
  metadata?: Record<string, unknown>;

  createdAt: string;
  updatedAt: string;

  userId?: string;
  tags: Tag[];
  entities?: Entity[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Entity {
  id: string;
  text: string;
  type: EntityType;
  startPos?: number;
  endPos?: number;
  confidence?: number;
  noteId: string;
  createdAt: string;
}

export interface CreateNoteDto {
  title: string;
  content?: string;
  sourceType?: SourceType;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
}

export interface UploadNoteDto {
  title?: string;
  sourceType: "AUDIO" | "IMAGE";
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FormErrors {
  [key: string]: string;
}

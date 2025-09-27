export interface Note {
  id: string;
  title: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface CreateNoteDto {
  title: string;
  content?: string;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

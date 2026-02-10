import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { EntityType, NoteStatus, Prisma, SourceType } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  private readonly includeRelations = {
    tags: true,
    entities: true,
    embedding: {
      select: {
        id: true,
        model: true,
        dimension: true,
        createdAt: true,
      },
    },
  };

  async create(createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content || '',
        sourceType: createNoteDto.sourceType || SourceType.TEXT,
        status: NoteStatus.READY,
      },
      include: this.includeRelations,
    });
  }

  async createFromUpload(
    title: string,
    sourceType: SourceType,
    filePath: string,
    mimeType: string,
    fileSize: number,
    metadata?: Record<string, unknown>,
  ) {
    return this.prisma.note.create({
      data: {
        title,
        content: '',
        sourceType,
        filePath,
        mimeType,
        fileSize,
        metadata: metadata as Prisma.JsonObject,
        status: NoteStatus.PROCESSING,
      },
      include: this.includeRelations,
    });
  }

  async findAll(options?: {
    status?: NoteStatus;
    sourceType?: SourceType;
    page?: number;
    limit?: number;
  }) {
    const { status, sourceType, page = 1, limit = 20 } = options || {};

    const where: Prisma.NoteWhereInput = {};
    if (status) where.status = status;
    if (sourceType) where.sourceType = sourceType;

    const [data, total] = await Promise.all([
      this.prisma.note.findMany({
        where,
        include: this.includeRelations,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.note.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const note = await this.prisma.note.findUnique({
      where: { id },
      include: this.includeRelations,
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    await this.findOne(id);

    return this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
      include: this.includeRelations,
    });
  }

  async updateStatus(id: string, status: NoteStatus) {
    return this.prisma.note.update({
      where: { id },
      data: { status },
    });
  }

  async updateContent(id: string, content: string) {
    return this.prisma.note.update({
      where: { id },
      data: {
        content,
        status: NoteStatus.READY,
      },
      include: this.includeRelations,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.note.delete({
      where: { id },
    });
  }

  async addEntities(
    noteId: string,
    entities: Array<{
      text: string;
      type: EntityType;
      startPos?: number;
      endPos?: number;
      confidence?: number;
    }>,
  ) {
    return this.prisma.entity.createMany({
      data: entities.map((e) => ({
        ...e,
        noteId,
      })),
    });
  }
}

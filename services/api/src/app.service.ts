import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Innuendo API is running! 🚀';
  }

  async getStats() {
    const notesCount = await this.prisma.note.count();
    const tagsCount = await this.prisma.tag.count();

    return {
      message: 'Database connected successfully!',
      stats: {
        notes: notesCount,
        tags: tagsCount,
      },
    };
  }
}

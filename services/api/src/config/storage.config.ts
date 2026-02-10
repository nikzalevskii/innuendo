import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

const ensureDir = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

const getSubDir = (mimeType: string): string => {
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('image/')) return 'images';
  return 'other';
};

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const subDir = getSubDir(file.mimetype);
      const fullPath = join(UPLOAD_DIR, subDir);
      ensureDir(fullPath);
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      const ext = extname(file.originalname).toLowerCase();
      cb(null, `${timestamp}-${random}${ext}`);
    },
  }),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter: (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    const allowedMimes = [
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/x-wav',
      'audio/m4a',
      'audio/x-m4a',
      'audio/ogg',
      'audio/webm',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
    }
  },
};

export const mimeToSourceType = (mimeType: string): 'AUDIO' | 'IMAGE' => {
  if (mimeType.startsWith('audio/')) return 'AUDIO';
  return 'IMAGE';
};

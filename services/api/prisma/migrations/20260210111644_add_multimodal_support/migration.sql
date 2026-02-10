-- CreateEnum
CREATE TYPE "public"."SourceType" AS ENUM ('TEXT', 'AUDIO', 'IMAGE');

-- CreateEnum
CREATE TYPE "public"."NoteStatus" AS ENUM ('PROCESSING', 'READY', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."EntityType" AS ENUM ('PERSON', 'ORG', 'LOC', 'DATE', 'EVENT', 'PRODUCT', 'CONCEPT', 'OTHER');

-- AlterTable
ALTER TABLE "public"."embeddings" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dimension" INTEGER NOT NULL DEFAULT 384,
ADD COLUMN     "model" TEXT NOT NULL DEFAULT 'all-MiniLM-L6-v2';

-- AlterTable
ALTER TABLE "public"."notes" ADD COLUMN     "file_path" TEXT,
ADD COLUMN     "file_size" INTEGER,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "mime_type" TEXT,
ADD COLUMN     "source_type" "public"."SourceType" NOT NULL DEFAULT 'TEXT',
ADD COLUMN     "status" "public"."NoteStatus" NOT NULL DEFAULT 'READY',
ADD COLUMN     "user_id" TEXT,
ALTER COLUMN "content" SET DEFAULT '';

-- AlterTable
ALTER TABLE "public"."tags" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."entities" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "public"."EntityType" NOT NULL,
    "start_pos" INTEGER,
    "end_pos" INTEGER,
    "confidence" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note_id" TEXT NOT NULL,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "entities_note_id_idx" ON "public"."entities"("note_id");

-- CreateIndex
CREATE INDEX "entities_type_idx" ON "public"."entities"("type");

-- CreateIndex
CREATE INDEX "entities_text_idx" ON "public"."entities"("text");

-- CreateIndex
CREATE INDEX "notes_user_id_idx" ON "public"."notes"("user_id");

-- CreateIndex
CREATE INDEX "notes_status_idx" ON "public"."notes"("status");

-- CreateIndex
CREATE INDEX "notes_source_type_idx" ON "public"."notes"("source_type");

-- CreateIndex
CREATE INDEX "notes_created_at_idx" ON "public"."notes"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "public"."notes" ADD CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."entities" ADD CONSTRAINT "entities_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "public"."notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

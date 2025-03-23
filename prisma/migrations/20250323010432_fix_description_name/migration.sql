-- AlterTable
ALTER TABLE "item" ALTER COLUMN "description_fr" SET DEFAULT 'Unknown',
ALTER COLUMN "title_en" SET DEFAULT 'Unknown',
ALTER COLUMN "description_en" SET DEFAULT 'Unknown';

-- RenameIndex
ALTER INDEX "item_title_key" RENAME TO "item_title_fr_key";

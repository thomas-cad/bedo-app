-- Rename "title" to "title_fr"
ALTER TABLE "item" RENAME COLUMN "title" TO "title_fr";

-- Add "title_en" (Provide a default empty string for existing rows)
ALTER TABLE "item" ADD COLUMN "title_en" TEXT NOT NULL DEFAULT '';

-- Rename "description" to "description_fr"
ALTER TABLE "item" RENAME COLUMN "description" TO "description_fr";

-- Add "description_en" (Provide a default empty string for existing rows)
ALTER TABLE "item" ADD COLUMN "description_en" TEXT NOT NULL DEFAULT '';

-- Remove default values (if needed)
ALTER TABLE "item" ALTER COLUMN "title_en" DROP DEFAULT;
ALTER TABLE "item" ALTER COLUMN "description_en" DROP DEFAULT;

/*
  Warnings:

  - You are about to drop the `api_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_event_typeId_fkey";

-- DropTable
DROP TABLE "api_user";

-- DropTable
DROP TABLE "event";

-- DropTable
DROP TABLE "event_type";

-- CreateTable
CREATE TABLE "pole" (
    "id" TEXT NOT NULL,
    "name_fr" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "description_fr" TEXT,
    "description_en" TEXT,
    "show" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membre" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'liteux',

    CONSTRAINT "membre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pole_membre" (
    "id" TEXT NOT NULL,
    "poleId" TEXT NOT NULL,
    "membreId" TEXT NOT NULL,

    CONSTRAINT "pole_membre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pole_id_key" ON "pole"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pole_name_fr_key" ON "pole"("name_fr");

-- CreateIndex
CREATE UNIQUE INDEX "pole_name_en_key" ON "pole"("name_en");

-- CreateIndex
CREATE UNIQUE INDEX "membre_id_key" ON "membre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pole_membre_id_key" ON "pole_membre"("id");

-- AddForeignKey
ALTER TABLE "pole_membre" ADD CONSTRAINT "pole_membre_poleId_fkey" FOREIGN KEY ("poleId") REFERENCES "pole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pole_membre" ADD CONSTRAINT "pole_membre_membreId_fkey" FOREIGN KEY ("membreId") REFERENCES "membre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

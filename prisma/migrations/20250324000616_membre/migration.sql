/*
  Warnings:

  - You are about to drop the column `role` on the `membre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "membre" DROP COLUMN "role",
ADD COLUMN     "role_en" TEXT NOT NULL DEFAULT 'Member',
ADD COLUMN     "role_fr" TEXT NOT NULL DEFAULT 'Membre';

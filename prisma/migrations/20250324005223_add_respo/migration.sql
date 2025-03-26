/*
  Warnings:

  - Added the required column `respo` to the `pole_membre` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pole_membre" ADD COLUMN     "respo" BOOLEAN NOT NULL;

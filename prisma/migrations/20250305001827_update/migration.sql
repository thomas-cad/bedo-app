/*
  Warnings:

  - Added the required column `quantity` to the `order_item_size` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_item_size" ADD COLUMN     "quantity" INTEGER NOT NULL;

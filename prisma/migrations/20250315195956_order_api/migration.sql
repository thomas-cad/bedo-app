/*
  Warnings:

  - You are about to drop the column `quantity` on the `order_item_size` table. All the data in the column will be lost.
  - Made the column `title` on table `event` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `bill` on the `event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "event" ALTER COLUMN "title" SET NOT NULL,
DROP COLUMN "bill",
ADD COLUMN     "bill" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "item_size" ADD COLUMN     "preorder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "order_item_size" DROP COLUMN "quantity",
ADD COLUMN     "preorder_quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stock_quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "api_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "api_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "api_user_id_key" ON "api_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "api_user_name_key" ON "api_user"("name");

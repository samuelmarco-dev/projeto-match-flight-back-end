/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `airlines` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `airport_boarding` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `airport_landing` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `cnpj` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `date_start_end` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "airlines" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "airport_boarding" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "airport_landing" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "cnpj" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "date_start_end" DROP COLUMN "updatedAt";

-- CreateIndex
CREATE UNIQUE INDEX "images_url_key" ON "images"("url");

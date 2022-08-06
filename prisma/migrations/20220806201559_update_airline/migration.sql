/*
  Warnings:

  - A unique constraint covering the columns `[name,initials]` on the table `airlines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "airlines_name_initials_key" ON "airlines"("name", "initials");

/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Colors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Colors_name_key" ON "Colors"("name");

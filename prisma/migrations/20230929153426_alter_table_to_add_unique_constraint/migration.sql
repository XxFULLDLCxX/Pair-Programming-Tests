/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `fruits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fruits_name_key" ON "fruits"("name");

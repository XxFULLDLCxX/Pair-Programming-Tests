/*
  Warnings:

  - You are about to drop the `Fruit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Fruit";

-- CreateTable
CREATE TABLE "fruits" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "fruits_pkey" PRIMARY KEY ("id")
);

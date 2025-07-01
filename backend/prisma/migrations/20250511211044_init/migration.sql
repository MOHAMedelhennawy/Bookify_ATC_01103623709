/*
  Warnings:

  - You are about to drop the column `category` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - Added the required column `address` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "category",
DROP COLUMN "date",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

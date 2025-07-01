/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

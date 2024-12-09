/*
  Warnings:

  - The `CNCL_DIST` column on the `addresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "CNCL_DIST",
ADD COLUMN     "CNCL_DIST" INTEGER;

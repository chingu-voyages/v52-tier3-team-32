/*
  Warnings:

  - Added the required column `LATITUDE` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LONGITUDE` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Made the column `PHONE_NUMBER` on table `appointments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ADDRESS` on table `appointments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `PREFERRED_TIMESLOT` on table `appointments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `STATUS` on table `appointments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DATE_TIMESTAMP` on table `appointments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "LATITUDE" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "LONGITUDE" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "PHONE_NUMBER" SET NOT NULL,
ALTER COLUMN "ADDRESS" SET NOT NULL,
ALTER COLUMN "PREFERRED_TIMESLOT" SET NOT NULL,
ALTER COLUMN "STATUS" SET NOT NULL,
ALTER COLUMN "DATE_TIMESTAMP" SET NOT NULL;

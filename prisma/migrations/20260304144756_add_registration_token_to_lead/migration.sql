/*
  Warnings:

  - A unique constraint covering the columns `[registrationToken]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "registrationToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Lead_registrationToken_key" ON "Lead"("registrationToken");

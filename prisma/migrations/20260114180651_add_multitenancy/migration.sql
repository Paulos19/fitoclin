-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'PROFESSIONAL';

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "professionalId" TEXT;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "professionalId" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

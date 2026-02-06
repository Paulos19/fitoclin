-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'USER';

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "isManualGrant" BOOLEAN NOT NULL DEFAULT false;

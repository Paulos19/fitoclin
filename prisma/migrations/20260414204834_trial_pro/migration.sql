-- AlterEnum
ALTER TYPE "SubscriptionPlan" ADD VALUE 'PRO';

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "isTrial" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TrialInvite" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrialInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrialInvite_email_key" ON "TrialInvite"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TrialInvite_token_key" ON "TrialInvite"("token");

-- CreateEnum
CREATE TYPE "CourseCategory" AS ENUM ('COMMUNITY', 'SPECIALIZATION');

-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('COMMUNITY', 'SPECIALIZATION');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "category" "CourseCategory" NOT NULL DEFAULT 'COMMUNITY';

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "plan" "SubscriptionPlan" NOT NULL DEFAULT 'COMMUNITY';

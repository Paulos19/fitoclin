-- AlterTable
ALTER TABLE "SiteInfo" ADD COLUMN     "communityBanner" TEXT,
ADD COLUMN     "homeBanners" TEXT[] DEFAULT ARRAY[]::TEXT[];

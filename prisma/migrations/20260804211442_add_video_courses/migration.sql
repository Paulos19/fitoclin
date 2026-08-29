-- CreateTable
CREATE TABLE "VideoCourse" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "youtubeUrl" TEXT NOT NULL,
    "coverImageUrl" TEXT,
    "releaseAt" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VideoCourse_active_releaseAt_idx" ON "VideoCourse"("active", "releaseAt");

-- CreateIndex
CREATE INDEX "VideoCourse_order_idx" ON "VideoCourse"("order");

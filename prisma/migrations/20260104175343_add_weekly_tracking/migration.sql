-- CreateTable
CREATE TABLE "WeeklyCheckin" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "sleepQuality" INTEGER NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "mood" INTEGER NOT NULL,
    "digestion" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklyCheckin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WeeklyCheckin_patientId_createdAt_idx" ON "WeeklyCheckin"("patientId", "createdAt");

-- AddForeignKey
ALTER TABLE "WeeklyCheckin" ADD CONSTRAINT "WeeklyCheckin_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

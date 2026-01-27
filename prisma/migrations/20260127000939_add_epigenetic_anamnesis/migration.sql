-- CreateTable
CREATE TABLE "EpigeneticAnamnesis" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "familyHistory" TEXT,
    "nutrition" TEXT,
    "physicalActivity" TEXT,
    "environmentalExposure" TEXT,
    "stressAndMentalHealth" TEXT,
    "healthHistory" TEXT,
    "substanceUse" TEXT,
    "sleepQuality" TEXT,
    "socialRelationships" TEXT,
    "traumaHistory" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EpigeneticAnamnesis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EpigeneticAnamnesis" ADD CONSTRAINT "EpigeneticAnamnesis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

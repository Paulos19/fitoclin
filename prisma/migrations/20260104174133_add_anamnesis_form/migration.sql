-- CreateTable
CREATE TABLE "Anamnesis" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "consultationDate" TIMESTAMP(3),
    "isFirstTime" BOOLEAN NOT NULL,
    "diagnosedDiseases" TEXT,
    "mainComplaint" TEXT NOT NULL,
    "sleepQuality" INTEGER NOT NULL,
    "bowelFunction" INTEGER NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "bodyPain" INTEGER NOT NULL,
    "immunity" INTEGER NOT NULL,
    "anxiety" INTEGER NOT NULL,
    "sadness" INTEGER NOT NULL,
    "mentalClarity" INTEGER NOT NULL,
    "stressHandling" INTEGER NOT NULL,
    "lifeSatisfaction" INTEGER NOT NULL,
    "purpose" INTEGER NOT NULL,
    "spirituality" INTEGER NOT NULL,
    "selfCare" INTEGER NOT NULL,
    "innerPeace" INTEGER NOT NULL,
    "medications" TEXT,
    "supplements" TEXT,
    "allergies" TEXT,
    "dietQuality" INTEGER NOT NULL,
    "lgpdAuthorized" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anamnesis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anamnesis_patientId_key" ON "Anamnesis"("patientId");

-- AddForeignKey
ALTER TABLE "Anamnesis" ADD CONSTRAINT "Anamnesis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

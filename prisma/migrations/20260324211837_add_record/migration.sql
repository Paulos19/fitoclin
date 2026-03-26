-- AlterTable
ALTER TABLE "MedicalRecord" ADD COLUMN     "audioUrl" TEXT,
ADD COLUMN     "transcription" TEXT,
ADD COLUMN     "transcriptionStatus" TEXT NOT NULL DEFAULT 'NONE';

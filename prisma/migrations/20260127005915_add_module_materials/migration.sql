-- CreateTable
CREATE TABLE "ModuleMaterial" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModuleMaterial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModuleMaterial" ADD CONSTRAINT "ModuleMaterial_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

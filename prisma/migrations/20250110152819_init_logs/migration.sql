-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('error', 'warn', 'info', 'http', 'debug');

-- CreateTable
CREATE TABLE "LogModel" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "level" "SeverityLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "ipAddress" TEXT,

    CONSTRAINT "LogModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LogModel_level_idx" ON "LogModel"("level");

-- CreateIndex
CREATE INDEX "LogModel_createdAt_idx" ON "LogModel"("createdAt");

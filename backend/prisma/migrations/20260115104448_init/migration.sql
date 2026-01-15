-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ALIVE', 'DEAD', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "gender" "Gender" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

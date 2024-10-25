/*
  Warnings:

  - Added the required column `type` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OnRampType" AS ENUM ('Deposit', 'Withdraw');

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "type" "OnRampType" NOT NULL;

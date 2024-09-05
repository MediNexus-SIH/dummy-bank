/*
  Warnings:

  - You are about to drop the column `bankId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Bank` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_bankId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "bankId";

-- DropTable
DROP TABLE "Bank";

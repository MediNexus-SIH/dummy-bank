/*
  Warnings:

  - Added the required column `bankId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "bankId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Bank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bank_name_key" ON "Bank"("name");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

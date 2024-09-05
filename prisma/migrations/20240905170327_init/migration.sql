-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "beneficiaryAccountNumber" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "transactionType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionId_key" ON "Transaction"("transactionId");

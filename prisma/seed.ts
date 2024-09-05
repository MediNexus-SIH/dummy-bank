// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create initial transactions
  await prisma.transaction.createMany({
    data: [
      {
        transactionId: "txn_000001",
        accountNumber: "1234567890",
        beneficiaryAccountNumber: "0987654321",
        amount: 500.0,
        currency: "USD",
        transactionType: "Deposit",
        description: "Initial deposit",
        transactionDate: new Date("2024-09-01T09:00:00Z"),
        status: "Completed",
      },
      {
        transactionId: "txn_000002",
        accountNumber: "1234567890",
        beneficiaryAccountNumber: "1122334455",
        amount: 250.0,
        currency: "USD",
        transactionType: "Transfer",
        description: "Payment for invoice #5678",
        transactionDate: new Date("2024-09-02T10:00:00Z"),
        status: "Completed",
      },
      {
        transactionId: "txn_000003",
        accountNumber: "0987654321",
        beneficiaryAccountNumber: "1234567890",
        amount: 1000.0,
        currency: "USD",
        transactionType: "Transfer",
        description: "Refund for order #7890",
        transactionDate: new Date("2024-09-03T11:30:00Z"),
        status: "Completed",
      },
      {
        transactionId: "txn_000004",
        accountNumber: "1234567890",
        beneficiaryAccountNumber: "2233445566",
        amount: 150.0,
        currency: "USD",
        transactionType: "Withdrawal",
        description: "ATM withdrawal",
        transactionDate: new Date("2024-09-04T14:15:00Z"),
        status: "Pending",
      },
      {
        transactionId: "txn_000005",
        accountNumber: "2233445566",
        beneficiaryAccountNumber: "1234567890",
        amount: 200.0,
        currency: "USD",
        transactionType: "Deposit",
        description: "Salary deposit",
        transactionDate: new Date("2024-09-05T09:00:00Z"),
        status: "Completed",
      },
      {
        transactionId: "txn_000006",
        accountNumber: "1234567890",
        beneficiaryAccountNumber: "3344556677",
        amount: 750.0,
        currency: "USD",
        transactionType: "Transfer",
        description: "Payment for services",
        transactionDate: new Date("2024-09-06T16:00:00Z"),
        status: "Completed",
      },
      {
        transactionId: "txn_000007",
        accountNumber: "3344556677",
        beneficiaryAccountNumber: "1234567890",
        amount: 300.0,
        currency: "USD",
        transactionType: "Transfer",
        description: "Loan repayment",
        transactionDate: new Date("2024-09-07T10:30:00Z"),
        status: "Pending",
      },
      {
        transactionId: "txn_000008",
        accountNumber: "1234567890",
        beneficiaryAccountNumber: "4455667788",
        amount: 600.0,
        currency: "USD",
        transactionType: "Deposit",
        description: "Interest payment",
        transactionDate: new Date("2024-09-08T08:45:00Z"),
        status: "Completed",
      },
      {
        transactionId: "txn_000009",
        accountNumber: "4455667788",
        beneficiaryAccountNumber: "1234567890",
        amount: 50.0,
        currency: "USD",
        transactionType: "Withdrawal",
        description: "Bank fee",
        transactionDate: new Date("2024-09-09T12:00:00Z"),
        status: "Completed",
      },
      {
        transactionId: "txn_000010",
        accountNumber: "1234567890",
        beneficiaryAccountNumber: "5566778899",
        amount: 200.0,
        currency: "USD",
        transactionType: "Transfer",
        description: "Payment for subscription",
        transactionDate: new Date("2024-09-10T15:30:00Z"),
        status: "Failed",
      },
    ],
  });

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

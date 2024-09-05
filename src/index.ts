import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const prisma = new PrismaClient();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Authentication middleware
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Auth middleware called");
  next();
};

app.use(authMiddleware);

// Define Zod schemas for validation
const transactionSchema = z.object({
  accountNumber: z.string(),
  beneficiaryAccountNumber: z.string(),
  amount: z.number().positive(),
  currency: z.string(),
  transactionType: z.string(),
  description: z.string(),
  transactionDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

const transactionIdSchema = z.string().nonempty();

// Endpoint to initiate a transaction
app.post("/transactions", async (req: Request, res: Response) => {
  try {
    const result = transactionSchema.parse(req.body);

    const transaction = await prisma.transaction.create({
      data: {
        transactionId: `txn_${Math.floor(Math.random() * 1000000)}`,
        ...result,
        status: "Pending",
      },
    });

    res
      .status(200)
      .json({
        transactionId: transaction.transactionId,
        status: "Pending",
        message: "Transaction has been initiated successfully.",
      });
  } catch (e:any) {
    res.status(400).json({ message: e.errors });
  }
});

// Endpoint to get transaction status
app.get("/transactions/:transactionId", async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    transactionIdSchema.parse(transactionId);

    const transaction = await prisma.transaction.findUnique({
      where: { transactionId },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction ID not found." });
    }

    res.status(200).json(transaction);
  } catch (e:any) {
    res.status(400).json({ message: e.errors });
  }
});

// Endpoint to list all transactions for an account
app.get("/transactions", async (req: Request, res: Response) => {
  const { accountNumber } = req.query;

  if (typeof accountNumber !== "string") {
    return res.status(400).json({ message: "Account number is required." });
  }

  const transactions = await prisma.transaction.findMany({
    where: { accountNumber },
  });

  res.status(200).json({ transactions });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const prisma = new client_1.PrismaClient();
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Authentication middleware
const authMiddleware = (req, res, next) => {
    console.log("Auth middleware called");
    next();
};
app.use(authMiddleware);
// Define Zod schemas for validation
const transactionSchema = zod_1.z.object({
    accountNumber: zod_1.z.string(),
    beneficiaryAccountNumber: zod_1.z.string(),
    amount: zod_1.z.number().positive(),
    currency: zod_1.z.string(),
    transactionType: zod_1.z.string(),
    description: zod_1.z.string(),
    transactionDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
});
const transactionIdSchema = zod_1.z.string().nonempty();
// Endpoint to initiate a transaction
app.post("/transactions", async (req, res) => {
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
    }
    catch (e) {
        res.status(400).json({ message: e.errors });
    }
});
// Endpoint to get transaction status
app.get("/transactions/:transactionId", async (req, res) => {
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
    }
    catch (e) {
        res.status(400).json({ message: e.errors });
    }
});
// Endpoint to list all transactions for an account
app.get("/transactions", async (req, res) => {
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

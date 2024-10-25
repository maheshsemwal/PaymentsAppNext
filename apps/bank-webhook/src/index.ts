import express from "express";
import { z } from "zod"; // Import Zod for validation
import db from "@repo/db/client";

const app = express();
app.use(express.json());

// Define the validation schema
const paymentSchema = z.object({
    token: z.string(),
    user_identifier: z.string(),
    amount: z.string().refine(value => !isNaN(Number(value)), {
        message: "Amount must be a valid number"
    }),
});

app.post("/hdfcWebhook", async (req, res) => {
    // Validate the request body
    try {
        const paymentInformation = paymentSchema.parse(req.body);

        // Destructure validated data
        const { token, user_identifier, amount } = paymentInformation;

        // Ensure userId is defined
        const userId = user_identifier;

        await db.$transaction(async (tx) => {
            const existingBalance = await tx.balance.findUnique({
                where: { userId }
            });

            if (existingBalance) {
                await tx.balance.update({
                    where: { userId },
                    data: {
                        amount: {
                            increment: Number(amount)
                        }
                    }
                });
            } else {
                await tx.balance.create({
                    data: {
                        amount: Number(amount),
                        userId,
                        locked: 0 // Provide a default for locked
                    }
                });
            }

            // Update transaction status
            await tx.onRampTransaction.updateMany({
                where: { token },
                data: { status: "Success" }
            });
        });

        res.json({ message: "Captured" });
    } catch (e) {
        console.error(e);
        // Handle validation errors
        if (e instanceof z.ZodError) {
            return res.status(400).json({ message: "Invalid input", errors: e.errors });
        }
        res.status(500).json({ message: "Error while processing webhook" });
    }
});

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function fetchTransactions() {
    // Fetch transactions where the current user is either the sender or receiver
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;
    const transactions = await db.p2pTransactions.findMany({
        where: {
            OR: [{ fromUserId: currentUserId }, { toUserId: currentUserId }],
        },
        include: {
            fromUser: true, // Includes the sender's user information
            toUser: true,   // Includes the receiver's user information
        },
    });
    
    // Map the transaction data, ensuring to handle possible null values
    return transactions.map((tx) => {
        const isSent = tx.fromUserId === currentUserId;

        // Get the other user's name or default to "Unknown User"
        const otherUserName = isSent ? tx.toUser.name : tx.fromUser.name;

        return {
            Name: otherUserName || "Unknown User", // Fallback for unknown users
            amount: tx.amount,
            Date: tx.timestamp,
            Type: isSent ? 'sent' : 'received' as 'sent' | 'received', // Determine if the transaction was sent or received
        };
    });
}

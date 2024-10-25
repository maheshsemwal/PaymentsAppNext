"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export  async function createOnRampTransaction(amount : number, provider: string) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const token = Math.random().toString(36);
    if(!session){
        return {
            message : "User not logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId,
            amount: amount*100, 
            provider,
            token,
            status: "Processing",
            startTime: new Date(),
            type: "Deposit"
        }, 
    })


}
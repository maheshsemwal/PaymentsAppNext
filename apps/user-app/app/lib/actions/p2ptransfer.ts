"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    return { message: "Not Authorized" };
  }

  const toUser = await db.user.findFirst({
    where: {
      OR: [{ email: to }, { number: to }],
    },
  });

  if (!toUser) {
    return { message: "User not found" };
  }

  const toBalance = await db.balance.findFirst({
    where: {
      userId: toUser.id,
    },
  });

  if (!toBalance) {
    await db.balance.create({
      data: {
        userId: toUser.id,
        amount: 0,
        locked: 0,
      },
    });
  }

  try {
    await db.$transaction(async (tx) => {
      await tx.$queryRaw `SELECT * FROM "Balance"  WHERE "userId" = ${from} FOR UPDATE`;
      const fromBalance = await tx.balance.findUnique({
        where: {
          userId: from,
        },
      });
      

      if (!fromBalance) {
        throw new Error("Sender's balance not found");
      }

      if (Number(fromBalance.amount) < amount) {
        throw new Error("Insufficient Fund");
      }

      await tx.balance.update({
        where: {
          userId: from,
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });

      await tx.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });
    });

    await db.p2pTransactions.create({
      data: {
          amount,
          timestamp: new Date(),
          fromUserId: from,
          toUserId: toUser.id,
      }
    })
    return { message: "Transaction successful", amount };
  } catch (error: any) {
    return { message: error.message };
  }
}

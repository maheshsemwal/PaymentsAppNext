-- CreateTable
CREATE TABLE "p2pTransactions" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,

    CONSTRAINT "p2pTransactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2pTransactions" ADD CONSTRAINT "p2pTransactions_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2pTransactions" ADD CONSTRAINT "p2pTransactions_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

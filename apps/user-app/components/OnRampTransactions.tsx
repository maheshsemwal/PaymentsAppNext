import { Card } from "@repo/ui/card"
import { TransactionCard } from "@repo/ui/transaction-card"
export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        Provider: string;
        Time: Date;
        status: 'Success' | 'Failure' | 'Processing';
        Type: 'Deposit' | 'Withdraw';
        amount: number;
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions" className="border p-6 rounded-xl bg-[#ededed]">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions" className="border p-6 rounded-xl bg-[#ededed]">
        <div className="pt-2">
            {transactions.map(t => <TransactionCard Provider={t.Provider}  Time={t.Time} status={t.status} Type={t.Type} amount={t.amount}/>)}
        </div>
    </Card>
}
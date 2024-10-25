import { Card } from "@repo/ui/card"
import { TransactionCard2 } from "@repo/ui/transaction-card2"
export const P2pTransactions = ({
    transactions
}: {
    transactions: {
        Name: string;
        amount: number;
        Date: Date;
        Type: 'sent' | 'received';
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions" className="border p-6 rounded-xl bg-[#ededed]">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions" className="border p-6 rounded-xl bg-[#ededed] w-1/2 m-2">
        <div>
            {transactions.map(t => <TransactionCard2 Name={t.Name}  Date={t.Date} Type={t.Type} amount={t.amount}/>)}
        </div>
    </Card>
}
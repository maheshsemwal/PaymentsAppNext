import SendMoneyCard from "../../../components/SendMoneyCard";
import { P2pTransactions } from "../../../components/p2pTransaction";
import { fetchTransactions } from "../../lib/actions/fetchTransactions";

const getTransactions = async () => {
    const txns = await fetchTransactions();
    return txns
};
export default async function TransactionPage() {
    // Fetch transactions on the server
    const transactions = await getTransactions();
    transactions.sort((a: any, b: any)=> b.Date - a.Date)
    return (
        <div className="m-20 flex w-full p-5">
            <SendMoneyCard />
            <P2pTransactions transactions={transactions} />
        </div>
    );
}

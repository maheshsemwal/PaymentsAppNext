type TransactionCard2Props = {
  Name: string;
  amount: number;
  Date: Date;
  Type: 'sent' | 'received';
};

export const TransactionCard2 = ({ Name, amount, Date, Type }: TransactionCard2Props) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getModeStyle = (type: 'sent' | 'received') => {
    return type === 'sent' ? 'text-red-500' : 'text-green-500';
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{Name}</h3>
        </div>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-4">{formatDate(Date)}</p>

        {/* Mode and amount */}
        <div className="flex justify-between items-center">
          <span className={`text-xl font-bold ${getModeStyle(Type)}`}>
            {Type === 'received' ? `+ ₹${amount / 100}` : `- ₹${amount / 100}`}
          </span>
        </div>
      </div>
    </div>
  );
};

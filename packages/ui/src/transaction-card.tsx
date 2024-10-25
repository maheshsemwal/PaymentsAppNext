type TransactionCardProps = {
    Provider: string;
        Time: Date;
        status: 'Success' | 'Failure' | 'Processing';
        Type: 'Deposit' | 'Withdraw';
        amount: number;
};

export const TransactionCard: React.FC<TransactionCardProps> = ({ Provider, Time, status, Type, amount }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'Failure':
        return 'bg-red-100 text-red-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return '';
    }
  };

  const getModeStyle = (Type: string) => {
    return Type === 'Deposit' ? 'text-green-500' : 'text-red-500';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{Provider}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-4">{formatDate(Time)}</p>

        {/* Mode and amount */}
        <div className="flex justify-between items-center">
          <span className={`text-xl font-bold ${getModeStyle(Type)}`}>
            {Type === 'Deposit' ? `+ ₹${amount/100}` : `- ₹${amount/100}`}
          </span>
          <p className="text-gray-500 capitalize">{Type}</p>
        </div>

        {/* Additional Content
        {children && <div className="mt-4">{children}</div>} */}
      </div>
    </div>
  );
};

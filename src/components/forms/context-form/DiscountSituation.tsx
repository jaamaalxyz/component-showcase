import { useFormDiscount } from '../../../providers/FormDataProvider';

export const DiscountSituation = () => {
  const discount = useFormDiscount();
  const discountPercent = Math.round((discount / 300) * 100);

  let statusInfo = {
    emoji: '😊',
    text: 'Great savings!',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  };

  if (discountPercent < 10) {
    statusInfo = {
      emoji: '😊',
      text: 'Good start!',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    };
  } else if (discountPercent < 50) {
    statusInfo = {
      emoji: '😐',
      text: 'Moderate savings',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    };
  } else {
    statusInfo = {
      emoji: '🤣',
      text: 'Excellent discount!',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    };
  }

  return (
    <div className={`p-3 rounded-lg border ${statusInfo.bgColor} ${statusInfo.borderColor}`}>
      <div className="flex items-center space-x-2">
        <span className="text-2xl">{statusInfo.emoji}</span>
        <div>
          <p className={`font-medium ${statusInfo.color}`}>{statusInfo.text}</p>
          <p className="text-sm text-gray-600">{discountPercent}% discount applied</p>
        </div>
      </div>
    </div>
  );
};

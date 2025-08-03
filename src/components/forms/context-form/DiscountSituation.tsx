import { useFormDiscount } from '../../../providers/FormDataProvider';

export const DiscountSituation = () => {
  const discount = useFormDiscount();
  const discountPercent = Math.round((discount / 300) * 100);

  let discountSituation = '😊';
  if (discountPercent < 10) discountSituation = '😊';
  else if (discountPercent < 50) discountSituation = '😐';
  else discountSituation = '🤣';

  return <div>Your discount situation: {discountSituation}</div>;
};

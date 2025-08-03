import { DraggingBar } from '../../../lib/dragging-bar';
import { useFormAPI } from '../../../providers/FormDataProvider';

export const DiscountFormComponent = () => {
  const { onDiscountChange } = useFormAPI();

  return (
    <div className="space-y-3">
      <DraggingBar
        onChange={(value: number) => onDiscountChange(value)}
        max={300}
        min={0}
        step={5}
        label="Discount Amount"
      />
    </div>
  );
};

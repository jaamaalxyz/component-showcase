import { DraggingBar } from '../../../lib/dragging-bar';
import { useFormAPI } from '../../../providers/FormDataProvider';

export const DiscountFormComponent = () => {
  const { onDiscountChange } = useFormAPI();

  return (
    <div>
      Please select your discount here: <br />
      <DraggingBar onChange={(value: number) => onDiscountChange(value)} />
    </div>
  );
};

import { useFormAPI } from '../../../providers/FormDataProvider';
import { Section } from './Section';

export const ActionsSection = () => {
  const { onSave } = useFormAPI();

  return (
    <Section title="Actions">
      <button onClick={onSave}>Save form</button>
    </Section>
  );
};

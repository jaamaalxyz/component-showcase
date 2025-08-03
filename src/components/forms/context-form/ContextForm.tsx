import { ActionsSection } from './ActionsSection';
import { PersonalInfoSection } from './PersonalInfoSection';
import { FormDataProvider } from '../../../providers/FormDataProvider';
import { ValueCalculationsSection } from './ValueCalculationSection';

export function ContextForm() {
  return (
    <FormDataProvider>
      <PersonalInfoSection />
      <ValueCalculationsSection />
      <ActionsSection />
    </FormDataProvider>
  );
}

import { DiscountSituation } from './DiscountSituation';
import { NameFormComponent } from './NameFormComponent';
import { Section } from './Section';
import { SelectCountryFormComponent } from './SelectCountryFormComponent';

export function PersonalInfoSection() {
  return (
    <Section title="Personal Information" description="Please provide your basic information">
      <DiscountSituation />
      <NameFormComponent />
      <SelectCountryFormComponent />
    </Section>
  );
}

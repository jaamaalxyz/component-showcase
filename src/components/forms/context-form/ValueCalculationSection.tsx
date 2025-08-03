import { DiscountFormComponent } from './DiscountFormComponent';
import { Section } from './Section';

export const ValueCalculationsSection = () => {
  return (
    <Section title="Discount Settings" description="Adjust your discount preferences">
      <DiscountFormComponent />
    </Section>
  );
};

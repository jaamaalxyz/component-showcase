import { SelectCountry } from '../../../lib/select-country';
import { useFormAPI, useFormCountry } from '../../../providers/FormDataProvider';

export const SelectCountryFormComponent = () => {
  const { onCountryChange } = useFormAPI();
  const country = useFormCountry();

  return <SelectCountry onChange={onCountryChange} activeCountry={country} />;
};

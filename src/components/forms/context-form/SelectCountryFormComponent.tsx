import { SelectCountry } from '../../../lib/select-country';
import { useFormAPI, useFormCountry } from '../../../providers/FormDataProvider';

export const SelectCountryFormComponent = () => {
  const { onCountryChange } = useFormAPI();
  const country = useFormCountry();

  return (
    <div className="space-y-2">
      <div className="block text-sm font-medium text-gray-700">Country/Region</div>
      <SelectCountry onChange={onCountryChange} activeCountry={country} showSelectedInfo={true} />
    </div>
  );
};

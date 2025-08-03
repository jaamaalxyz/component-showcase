import { rawCountries } from './raw-data';
import { Country } from './types';
import { CountriesList } from './list';
import { ThemeProvider, Mode } from './theme';

interface RawCountryData {
  name: { common: string };
  cca2: string;
  independent: boolean | null;
  unMember: boolean | null;
  region: string;
  capital: string[];
  subregion: string;
}

const getCountriesFromRawData = (raw: RawCountryData[]): Country[] => {
  return raw.map((value: RawCountryData) => ({
    __typename: 'country',
    name: String(value.name.common),
    id: String(value.cca2).toLowerCase(),
    independent: Boolean(value.independent),
    unMember: Boolean(value.unMember),
    flagUrl: `https://flagcdn.com/${String(value.cca2).toLowerCase()}.svg`,
    region: String(value.region),
    capital: value.capital?.length ? String(value.capital[0]) : '',
    subregion: String(value.subregion),
  }));
};

type SelectCountryProps = {
  activeCountry: Country;
  onChange: (country: Country) => void;
  mode?: Mode;
  showSelectedInfo?: boolean;
};

export type { Country };

export const SelectCountry = ({
  activeCountry,
  onChange,
  mode = 'light',
  showSelectedInfo = false,
}: SelectCountryProps) => {
  const countries = getCountriesFromRawData(rawCountries);

  return (
    <ThemeProvider value={{ mode }}>
      <div className={`p-4 rounded-lg ${mode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        {showSelectedInfo && activeCountry && (
          <div
            className={`mb-4 p-3 rounded-lg border ${
              mode === 'dark'
                ? 'bg-gray-800 border-gray-600 text-white'
                : 'bg-blue-50 border-blue-200 text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={activeCountry.flagUrl}
                width={24}
                height={18}
                className="rounded shadow-sm object-cover"
                alt={`${activeCountry.name} flag`}
              />
              <div>
                <div className="font-medium">{activeCountry.name}</div>
                <div className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {activeCountry.capital && `${activeCountry.capital}, `}
                  {activeCountry.region}
                </div>
              </div>
            </div>
          </div>
        )}

        <CountriesList
          countries={countries}
          onCountryChanged={(c) => onChange(c)}
          savedCountry={activeCountry || countries[0]}
        />
      </div>
    </ThemeProvider>
  );
};

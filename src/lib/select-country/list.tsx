import { useState } from 'react';
import { Country } from './types';
import { useTheme } from './theme';

type CountriesListProps = {
  countries: Country[];
  onCountryChanged: (country: Country) => void;
  savedCountry: Country;
};

export const CountriesList = ({
  countries,
  onCountryChanged,
  savedCountry,
}: CountriesListProps) => {
  const { mode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Item = ({ country }: { country: Country }) => {
    const isSelected = savedCountry.id === country.id;

    return (
      <button
        className={`w-full flex items-center p-3 text-left rounded-lg transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          isSelected
            ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
            : 'border-2 border-transparent hover:border-gray-200'
        } ${
          mode === 'dark' ? 'hover:bg-gray-800 bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
        onClick={() => onCountryChanged(country)}
      >
        <img
          src={country.flagUrl}
          width={32}
          height={24}
          className="rounded shadow-sm flex-shrink-0 mr-3 object-cover"
          alt={`${country.name} flag`}
        />
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{country.name}</div>
          <div className="text-sm text-gray-500 truncate">{country.region}</div>
        </div>
        {isSelected && (
          <div className="flex-shrink-0 ml-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-4" data-testid="countries-list">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
            mode === 'dark'
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      {/* Countries List */}
      <div
        className={`max-h-64 overflow-y-auto space-y-2 rounded-lg border p-2 ${
          mode === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => <Item country={country} key={country.id} />)
        ) : (
          <div
            className={`text-center py-8 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <svg
              className="mx-auto h-8 w-8 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.7-2.6M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm">No countries found</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className={`text-sm text-center ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        Showing {filteredCountries.length} of {countries.length} countries
      </div>
    </div>
  );
};

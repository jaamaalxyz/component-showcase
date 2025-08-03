import { Country } from './types';
import { useTheme } from './theme';

export const SelectedCountry = ({
  country,
  onCountrySaved,
}: {
  country: Country;
  onCountrySaved: () => void;
}) => {
  const { mode } = useTheme();

  return (
    <div
      className={`p-6 rounded-xl border shadow-sm ${
        mode === 'dark'
          ? 'bg-gray-800 border-gray-600 text-white'
          : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={country.flagUrl}
              width={40}
              height={30}
              className="rounded shadow-sm object-cover"
              alt={`${country.name} flag`}
            />
            <h3 className="text-lg font-semibold">{country.name}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Capital:</span>
              <span className="font-medium">{country.capital || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Region:</span>
              <span className="font-medium">{country.region}</span>
            </div>
            <div className="flex justify-between">
              <span className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Subregion:
              </span>
              <span className="font-medium">{country.subregion}</span>
            </div>
            <div className="flex justify-between">
              <span className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Independent:
              </span>
              <span
                className={`font-medium ${country.independent ? 'text-green-600' : 'text-red-600'}`}
              >
                {country.independent ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onCountrySaved}
            type="button"
          >
            Save Selection
          </button>
        </div>
      </div>
    </div>
  );
};

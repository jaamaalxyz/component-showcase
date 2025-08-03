import { useNavigate } from 'react-router';
import {
  useFormAPI,
  useFormName,
  useFormCountry,
  useFormDiscount,
} from '../../../providers/FormDataProvider';

export const SuccessModal = () => {
  const { onCloseModal, showSuccessModal } = useFormAPI();
  const name = useFormName();
  const country = useFormCountry();
  const discount = useFormDiscount();
  const navigate = useNavigate();

  const handleClose = () => {
    onCloseModal();
    navigate('/');
  };

  if (!showSuccessModal) return null;

  const discountPercent = Math.round((discount / 300) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        role="button"
        tabIndex={0}
        aria-label="Close modal"
        onClick={handleClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClose();
          }
        }}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
          {/* Success Icon */}
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
            Information Saved Successfully!
          </h3>

          {/* User Information */}
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-gray-900 text-sm">Your Information:</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-gray-900">{name}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Country:</span>
                  <div className="flex items-center space-x-2">
                    <img
                      src={country.flagUrl}
                      width={16}
                      height={12}
                      className="rounded object-cover"
                      alt={`${country.name} flag`}
                    />
                    <span className="font-medium text-gray-900">{country.name}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Capital:</span>
                  <span className="font-medium text-gray-900">{country.capital || 'N/A'}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Region:</span>
                  <span className="font-medium text-gray-900">{country.region}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium text-blue-600">
                    {discount} ({discountPercent}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Thank you message */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Thank you for providing your information. You will be redirected to the home page.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleClose}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Done
            </button>
            <button
              onClick={() => onCloseModal()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>

          {/* Close X button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

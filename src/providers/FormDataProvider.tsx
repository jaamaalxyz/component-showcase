import { createContext, ReactNode, useReducer, useMemo, useContext } from 'react';
import type { Country } from '../lib/select-country';

type State = {
  name: string;
  country: Country;
  discount: number;
  showSuccessModal: boolean;
};

type API = {
  onNameChange: (name: string) => void;
  onCountryChange: (name: Country) => void;
  onDiscountChange: (price: number) => void;
  onSave: () => void;
  onReset: () => void;
  isFormValid: boolean;
  showSuccessModal: boolean;
  onCloseModal: () => void;
};

const FormNameContext = createContext<State['name']>({} as State['name']);
const FormCountryContext = createContext<State['country']>({} as State['country']);
const FormDiscountContext = createContext<State['discount']>({} as State['discount']);
const FormAPIContext = createContext<API>({} as API);

type Actions =
  | { type: 'updateName'; name: string }
  | { type: 'updateCountry'; country: Country }
  | { type: 'updateDiscount'; discount: number }
  | { type: 'showSuccessModal' }
  | { type: 'closeModal' }
  | { type: 'resetForm' };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'updateName':
      return { ...state, name: action.name };
    case 'updateDiscount':
      return { ...state, discount: action.discount };
    case 'updateCountry':
      return { ...state, country: action.country };
    case 'showSuccessModal':
      return { ...state, showSuccessModal: true };
    case 'closeModal':
      return { ...state, showSuccessModal: false };
    case 'resetForm':
      return { ...initialState, showSuccessModal: false };
  }
};

const initialState: State = {
  name: '',
  country: {
    __typename: 'country',
    name: 'United States',
    id: 'us',
    flagUrl: 'https://flagcdn.com/us.svg',
    independent: true,
    unMember: true,
    region: 'Americas',
    capital: 'Washington',
    subregion: 'North America',
  },
  discount: 0,
  showSuccessModal: false,
};

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const api = useMemo(() => {
    const isFormValid = state.name.trim().length > 0;

    const onSave = () => {
      if (!isFormValid) {
        return;
      }
      // TODO: send the request to the backend here
      // Example: await saveUserData(state);
      dispatch({ type: 'showSuccessModal' });
    };

    const onReset = () => {
      dispatch({ type: 'resetForm' });
    };

    const onCloseModal = () => {
      dispatch({ type: 'closeModal' });
    };

    const onDiscountChange = (discount: number) => {
      dispatch({ type: 'updateDiscount', discount });
    };

    const onNameChange = (name: string) => {
      dispatch({ type: 'updateName', name });
    };

    const onCountryChange = (country: Country) => {
      dispatch({ type: 'updateCountry', country });
    };

    return {
      onSave,
      onReset,
      onCloseModal,
      onDiscountChange,
      onNameChange,
      onCountryChange,
      isFormValid,
      showSuccessModal: state.showSuccessModal,
    };
  }, [state]);

  return (
    <FormAPIContext.Provider value={api}>
      <FormNameContext.Provider value={state.name}>
        <FormCountryContext.Provider value={state.country}>
          <FormDiscountContext.Provider value={state.discount}>
            {children}
          </FormDiscountContext.Provider>
        </FormCountryContext.Provider>
      </FormNameContext.Provider>
    </FormAPIContext.Provider>
  );
};

export const useFormAPI = () => useContext(FormAPIContext);
export const useFormName = () => useContext(FormNameContext);
export const useFormCountry = () => useContext(FormCountryContext);
export const useFormDiscount = () => useContext(FormDiscountContext);

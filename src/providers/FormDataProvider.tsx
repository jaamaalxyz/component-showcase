import { createContext, ReactNode, useReducer, useMemo, useContext } from 'react';
import type { Country } from '../lib/select-country';

type State = {
  name: string;
  country: Country;
  discount: number;
};

type API = {
  onNameChange: (name: string) => void;
  onCountryChange: (name: Country) => void;
  onDiscountChange: (price: number) => void;
  onSave: () => void;
};

const FormNameContext = createContext<State['name']>({} as State['name']);
const FormCountryContext = createContext<State['country']>({} as State['country']);
const FormDiscountContext = createContext<State['discount']>({} as State['discount']);
const FormAPIContext = createContext<API>({} as API);

type Actions =
  | { type: 'updateName'; name: string }
  | { type: 'updateCountry'; country: Country }
  | { type: 'updateDiscount'; discount: number };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'updateName':
      return { ...state, name: action.name };
    case 'updateDiscount':
      return { ...state, discount: action.discount };
    case 'updateCountry':
      return { ...state, country: action.country };
  }
};

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {} as State);

  const api = useMemo(() => {
    const onSave = () => {
      // send the request to the backend here
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

    return { onSave, onDiscountChange, onNameChange, onCountryChange };
  }, []);

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

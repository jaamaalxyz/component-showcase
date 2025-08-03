import { ChangeEvent } from 'react';
import { useFormAPI, useFormName } from '../../../providers/FormDataProvider';

export const NameFormComponent = () => {
  const name = useFormName();
  const { onNameChange } = useFormAPI();

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };

  return (
    <div>
      Type your name here: <br />
      <input onChange={onValueChange} value={name} />
    </div>
  );
};

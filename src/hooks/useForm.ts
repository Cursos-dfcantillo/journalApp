import { useState, ChangeEvent, useEffect, useMemo } from 'react';

interface FormState {
  [key: string]: any;
}
export type FormValidation = Record<string, [(value: string) => boolean, string]>;

// interface FormFunctions {
//   [key: string]: () => void | ((event: ChangeEvent<HTMLInputElement>) => void);
// }

export const useForm = (initialForm: FormState = {}, formValidations:FormValidation = {}) => {
  const [formState, setFormState] = useState<FormState>(initialForm);
  const [formValidation, setFormValidation] = useState<{[key: string]: any;}>({});

  useEffect(() => {
      createValidators();
  }, [formState]);

//   useEffect(() => {
//       setFormState(initialForm);
//  }, [initialForm])
 

  const isFormValid =  useMemo(() => {
    for (const formField of Object.keys(formValidation)) {
      const value = formValidation[formField];
      if(value) return false;
    }
    return true;
  }, [formValidation]);


  

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues:any = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn , errorMessage] = formValidations[formField]; 
      const value = formState[formField];
      const valid = fn(value);
      // console.log(`${formField} Valid: ${valid}`);
      formCheckedValues[`${formField}Valid`] = valid ? null : errorMessage
    }
    setFormValidation(formCheckedValues);
  }


  return {
    ...formState,
    formState,
    setFormState,
    isFormValid,
    formValidation,
    onInputChange,
    onResetForm,
  };
};

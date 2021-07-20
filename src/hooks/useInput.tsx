import {useCallback, useState} from 'react';
import validateHelper from 'validate.js';

export interface ValidationErrors {
  [key: string]: string[];
}

interface Rules extends Record<string, any> {}

interface ValidationOptions {
  rules: Rules;
}

export function useInput<T extends Record<string, any>>(initialState: T = {} as T, validationOptions?: ValidationOptions) {
  const [inputs, setInputsLocal] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>();

  const handleInputChange = useCallback((data: Record<string, any> = {}) => {
    if (!data.page && !data.limit) {
      data.page = 1;
      data.limit = 100;
    }
    setInputsLocal(i => ({...i, ...data}));
  }, []);

  const resetInput = () => {
    setInputsLocal(initialState);
  };

  const getErrors = (): ValidationErrors | undefined => {
    const rules = validationOptions?.rules;
    if (!rules) {
      return undefined;
    }
    validateHelper.validators.presence.options = {allowEmpty: false};
    const validationErrors = validateHelper.validate(inputs, rules);
    setErrors(validationErrors);
    return validationErrors;
  };

  return {
    validation: {
      getErrors,
      errors,
    },
    setInputs: handleInputChange,
    inputs,
    resetInput,
  };
}

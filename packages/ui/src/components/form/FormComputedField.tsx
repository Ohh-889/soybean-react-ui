'use client';

import { ComputedField } from '@skyroc/form';

import FormField from './FormField';
import type { FormComputedFieldProps } from './types';

const FormComputedField = <Values = any,>(props: FormComputedFieldProps<Values>) => {
  return (
    <FormField
      component={ComputedField}
      {...props}
    />
  );
};

export default FormComputedField;

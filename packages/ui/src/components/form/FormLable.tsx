import { cn } from '@/lib/utils';

import Label from '../label/Label';

import { formVariants } from './form-variants';
import type { FormLabelProps } from './types';

const FormLabel = (props: FormLabelProps) => {
  const { className, error, size, ...rest } = props;

  const { label } = formVariants({ error, size });

  const mergedCls = cn(label(), className);

  return (
    <Label
      className={mergedCls}
      data-error={error}
      data-slot="form-label"
      size={size}
      {...rest}
    />
  );
};

export default FormLabel;

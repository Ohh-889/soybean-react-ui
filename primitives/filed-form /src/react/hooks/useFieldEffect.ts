import { useEffect } from 'react';
import type { AllPathsKeys } from 'skyroc-type-utils';

import type { FormInstance, InternalFormInstance } from './FieldContext';
import { useFieldContext } from './FieldContext';

export function useEffectField<Values = any>(
  deps: AllPathsKeys<Values>[],
  effect: (get: (n: AllPathsKeys<Values>) => any, all: Values) => void,
  form?: FormInstance<Values>
) {
  const contextForm = useFieldContext<Values>();

  const formInstance = form ?? contextForm;

  if (!formInstance) {
    throw new Error('Can not find FormContext. Please make sure you wrap Field under Form or provide a form instance.');
  }

  const { getInternalHooks } = formInstance as unknown as InternalFormInstance<Values>;

  const { registerEffect } = getInternalHooks();

  useEffect(() => {
    const unregister = registerEffect(deps, effect);
    return unregister;
  }, [deps]);
}

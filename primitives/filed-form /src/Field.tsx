'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { Slot } from '@radix-ui/react-slot';
import { useEffect, useId, useRef, useState } from 'react';
import { capitalize, getEventValue, isEqual, omitUndefined, toArray } from 'skyroc-utils';

import type { InternalFormInstance } from './FieldContext';
import { useFieldContext } from './FieldContext';
import type { InternalFieldProps } from './types/field';
import type { StoreValue } from './types/formStore';

function Field<Values = any>(props: InternalFieldProps<Values>) {
  const {
    children,
    controlMode = 'uncontrolled',
    getValueFromEvent,
    initialValue,
    name,
    normalize,
    preserve = true,
    rules,
    trigger = 'onChange',
    unControlledValueChange,
    validateTrigger,
    valuePropName = 'value',
    ...rest
  } = props;

  // eslint-disable-next-line react/hook-use-state
  const [_, forceUpdate] = useState({});

  const fieldContext = useFieldContext<Values>();

  const normalizedChangedRef = useRef(false);

  const key = useId();

  const cref = useRef<any>(null);

  const {
    getFieldsValue,
    getFieldValue,
    getInternalHooks,
    validateTrigger: fieldValidateTrigger
  } = fieldContext as unknown as InternalFormInstance<Values>;

  const { dispatch, getInitialValue, registerField } = getInternalHooks();

  const isControlled = controlMode === 'controlled';

  const mergedValidateTrigger = validateTrigger || fieldValidateTrigger;

  const initiValue = getInitialValue(name) || initialValue;

  const validateTriggerList: string[] = toArray(mergedValidateTrigger);

  const make =
    (evt: string) =>
    (..._args: any[]) =>
      dispatch({ name, opts: { trigger: evt }, type: 'validateField' });

  const restValidateTriggerList = validateTriggerList
    .filter(item => item !== trigger)
    .reduce(
      (acc, item) => {
        acc[item] = make(item);

        return acc;
      },
      {} as Record<string, (...args: any[]) => void>
    );

  const value = getFieldValue(name);

  const valueProps = isControlled
    ? { [valuePropName]: value }
    : { [`default${capitalize(valuePropName)}`]: initiValue };

  const controlledProps = omitUndefined({
    [trigger]: name
      ? (...args: any[]) => {
          let newValue: StoreValue;

          const oldValue = getFieldValue(name);

          if (getValueFromEvent) {
            newValue = getValueFromEvent(...args);
          } else {
            newValue = getEventValue(valuePropName, ...args);
          }

          if (normalize) {
            const norm = normalize(newValue, oldValue, getFieldsValue());

            if (!isEqual(norm, newValue)) {
              newValue = norm;
              normalizedChangedRef.current = true;
            }
          }

          if (newValue !== oldValue) {
            dispatch({
              name,
              type: 'updateValue',
              value: newValue
            });
          }

          if (validateTriggerList.includes(trigger)) {
            dispatch({
              name,
              opts: { trigger },
              type: 'validateField'
            });
          }
        }
      : undefined
  });

  useEffect(() => {
    const unregister = registerField({
      changeValue: (newValue, isShouldUpdate) => {
        if (!isShouldUpdate || !normalizedChangedRef.current) return;

        normalizedChangedRef.current = false;

        if (isControlled) {
          forceUpdate({});
          return;
        }
        const el = cref.current;

        if (!el) return;

        if (!isControlled) {
          if (cref.current && !isControlled) {
            if (unControlledValueChange) {
              unControlledValueChange(cref.current, newValue);
            } else {
              cref.current.value = newValue as any;
            }
          }
        }
      },
      initialValue,
      name,
      preserve
    });

    dispatch({ name, rules, type: 'setRules' });

    return () => {
      unregister();
    };
  }, []);

  return (
    <Slot
      key={key}
      {...(valueProps as any)}
      {...controlledProps}
      {...restValidateTriggerList}
      {...rest}
      ref={cref}
    >
      {children}
    </Slot>
  );
}

export default Field;

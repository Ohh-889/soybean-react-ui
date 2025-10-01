'use client';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/hook-use-state */

/**
 * ComputedField component for reactive computed form fields
 * Automatically recalculates its value based on dependencies and renders as read-only
 */

import { Slot } from '@radix-ui/react-slot';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import type { AllPathsKeys } from 'skyroc-type-utils';

import type { StoreValue } from '../../form-core/types';
import type { Rule } from '../../form-core/validation';
import { useFieldContext } from '../hooks/FieldContext';
import type { InternalFormInstance } from '../hooks/FieldContext';

export type ComputedFieldProps<Values, T extends AllPathsKeys<Values> = AllPathsKeys<Values>> = {
  /** Child element to render with computed value */
  children?: ReactElement;
  /** Function to compute the field value based on dependencies */
  compute: (get: (n: T) => StoreValue, all: Values) => StoreValue;
  /** Array of field names that this computed field depends on */
  deps: T[];
  /** Name/path of this computed field */
  name: T;
  /** Whether to preserve field value after component unmount */
  preserve?: boolean;
  /** Validation rules for the computed field */
  rules?: Rule[];
  /** Name of the prop to pass the computed value to child component */
  valuePropName?: string;
};

/**
 * ComputedField component that creates a reactive computed field
 * The field automatically recalculates when its dependencies change
 * and renders as a read-only field
 *
 * @example
 * ```tsx
 * // Example: Calculate total price based on quantity and unit price
 * <Form>
 *   <Field name="quantity" >
 *     <Input />
 *   </Field>
 *   <Field name="unitPrice" >
 *     <Input />
 *   </Field>
 *
 *   <ComputedField
 *     name="totalPrice"
 *     deps={['quantity', 'unitPrice']}
 *     compute={(get) => {
 *       const quantity = get('quantity') || 0;
 *       const unitPrice = get('unitPrice') || 0;
 *       return quantity * unitPrice;
 *     }}
 *   >
 *     <Input placeholder="Total Price (calculated)" />
 *   </ComputedField>
 * </Form>
 * ```
 */
function ComputedField<Values = any>({
  children,
  compute,
  deps,
  name,
  preserve = true,
  rules,
  valuePropName = 'value'
}: ComputedFieldProps<Values>) {
  // Get form context to access form methods
  const fieldContext = useFieldContext<Values>();

  // Extract form instance methods
  const { getFieldValue, getInternalHooks } = fieldContext as unknown as InternalFormInstance<Values>;

  // Local state to track computed value for re-rendering
  const [value, updateValue] = useState(getFieldValue(name));

  // Get internal hooks for field registration and rule setting
  const { registerComputed, registerField, setFieldRules } = getInternalHooks();

  useEffect(() => {
    // Register this field as a computed field with its dependencies
    const unregister = registerComputed(name, deps, compute);

    // Register field entity to receive value change notifications
    // This ensures the component re-renders when the computed value changes
    const unsub = registerField({
      changeValue: newValue => {
        updateValue(newValue);
      },
      initialValue: getFieldValue(name),
      name,
      preserve
    });

    // Set validation rules if provided
    if (rules) setFieldRules(name, rules);

    // Cleanup: unregister computed field and field entity
    return () => {
      unregister();
      unsub();
    };
  }, []);

  // Prepare props to pass to child component
  const slotProps = {
    readOnly: true, // Computed fields are always read-only
    [valuePropName]: value ?? '' // Pass computed value using specified prop name
  };

  // Render child component with computed value and read-only state
  return <Slot {...slotProps}>{children}</Slot>;
}

export default ComputedField;

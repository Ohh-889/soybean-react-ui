'use client';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/hook-use-state */

/**
 * Field component for form input fields with validation and state management
 * Supports both controlled and uncontrolled modes with flexible event handling
 */

import { Slot } from '@radix-ui/react-slot';
import type { ReactElement } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import type { AllPathsKeys } from 'skyroc-type-utils';
import { capitalize, getEventValue, isEqual, isNil, omitUndefined, toArray } from 'skyroc-utils';

import type { EventArgs, StoreValue } from '../../form-core/types';
import type { Rule } from '../../form-core/validation';
import type { InternalFormInstance } from '../hooks/FieldContext';
import { useFieldContext } from '../hooks/FieldContext';

export type FieldProps<Values> = {
  /** Child element to render as the form field */
  children?: ReactElement;
  /** Control mode: 'controlled' for React controlled components, 'uncontrolled' for DOM-based */
  controlMode?: 'controlled' | 'uncontrolled';
  /** Custom function to extract value from event arguments */
  getValueFromEvent?: (...args: EventArgs) => StoreValue;
  /** Function to transform value before passing to child component */
  getValueProps?: (value: StoreValue) => StoreValue;
  /** Initial value for the field */
  initialValue?: StoreValue;
  /** Field name path in the form */
  name: AllPathsKeys<Values>;
  /** Function to normalize/transform the value after change */
  normalize?: (value: StoreValue, prevValue: StoreValue, allValues: Values) => StoreValue;
  /** Whether to preserve field value after component unmount */
  preserve?: boolean;
  /** Validation rules for the field */
  rules?: Rule[];
  /** Event name that triggers value change (default: 'onChange') */
  trigger?: string;
  /** Custom function to update uncontrolled component value */
  unControlledValueChange?: (ref: any, newValue: StoreValue) => void;
  /** Event name(s) that trigger validation */
  validateTrigger?: string | string[] | false;
  /** Name of the prop to pass the field value (default: 'value') */
  valuePropName?: string;
} & Record<string, any>;

/**
 * Field component that wraps form input elements with state management and validation
 * Supports both controlled and uncontrolled modes with flexible customization options
 *
 * @example
 * ```tsx
 * // Basic usage with validation
 * <Form>
 *   <Field
 *     name="email"
 *     rules={[
 *       { required: true, message: 'Email is required' },
 *       { type: 'email', message: 'Invalid email format' }
 *     ]}
 *   >
 *     <Input placeholder="Enter your email" />
 *   </Field>
 * </Form>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled mode with custom validation trigger
 * <Field
 *   name="password"
 *   controlMode="controlled"
 *   validateTrigger={['onChange', 'onBlur']}
 *   rules={[
 *     { required: true, message: 'Password is required' },
 *     { min: 8, message: 'Password must be at least 8 characters' }
 *   ]}
 * >
 *   <Input type="password" placeholder="Enter password" />
 * </Field>
 * ```
 *
 * @example
 * ```tsx
 * // Custom value extraction and normalization
 * <Field
 *   name="phone"
 *   getValueFromEvent={(e) => e.target.value.replace(/\D/g, '')}
 *   normalize={(value) => {
 *     // Format phone number: (123) 456-7890
 *     const cleaned = value.replace(/\D/g, '');
 *     const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
 *     return match ? `(${match[1]}) ${match[2]}-${match[3]}` : value;
 *   }}
 *   rules={[{ required: true, message: 'Phone number is required' }]}
 * >
 *   <Input placeholder="(123) 456-7890" />
 * </Field>
 * ```
 */
function Field<Values = any>(props: FieldProps<Values>) {
  // Destructure props with default values
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

  // State for forcing re-renders in controlled mode
  const [_, forceUpdate] = useState({});

  // Get form context to access form methods
  const fieldContext = useFieldContext<Values>();

  // Track if value was changed by normalization
  const normalizedChangedRef = useRef(false);

  // Unique key for React reconciliation
  const key = useId();

  // Reference to the child component
  const cref = useRef<any>(null);

  // Extract form instance methods
  const {
    getFieldsValue,
    getFieldValue,
    getInternalHooks,
    setFieldValue,
    validateField,
    validateTrigger: fieldValidateTrigger
  } = fieldContext as unknown as InternalFormInstance<Values>;

  // Get internal hooks for field registration and rule setting
  const { registerField, setFieldRules } = getInternalHooks();

  // Determine if field should be controlled
  const isControlled = controlMode === 'controlled';

  // Merge field-level and form-level validation triggers
  const mergedValidateTrigger = validateTrigger || fieldValidateTrigger;

  // Convert validation triggers to array format
  const validateTriggerList: string[] = toArray(mergedValidateTrigger);

  // Helper function to create validation trigger handlers
  const make =
    (evt: string) =>
    (..._args: any[]) =>
      validateField(name, { trigger: evt });

  // Create handlers for validation triggers that are not the main trigger
  const restValidateTriggerList = validateTriggerList
    .filter(item => item !== trigger)
    .reduce(
      (acc, item) => {
        acc[item] = make(item);

        return acc;
      },
      {} as Record<string, (...args: any[]) => void>
    );

  // Get current field value or use initial value as fallback
  const value = getFieldValue(name) || initialValue;

  // Prepare value props based on control mode
  // Controlled: use 'value' prop, Uncontrolled: use 'defaultValue' prop
  const valueProps = isControlled ? { [valuePropName]: value } : { [`default${capitalize(valuePropName)}`]: value };

  // Create controlled props with change handler
  const controlledProps = omitUndefined({
    [trigger]: name
      ? (...args: any[]) => {
          let newValue: StoreValue;

          // Get current value for comparison
          const oldValue = getFieldValue(name);

          // Extract new value from event using custom or default extractor
          if (getValueFromEvent) {
            newValue = getValueFromEvent(...args);
          } else {
            newValue = getEventValue(valuePropName, ...args);
          }

          // Apply normalization if provided
          if (normalize) {
            const norm = normalize(newValue, oldValue, getFieldsValue() as Values);

            if (!isEqual(norm, newValue)) {
              newValue = norm;
              normalizedChangedRef.current = true;
            }
          }

          // Update field value if it changed
          if (newValue !== oldValue) {
            setFieldValue(name, newValue);
          }

          // Trigger validation if this event is a validation trigger
          if (validateTriggerList.includes(trigger)) {
            validateField(name, { trigger });
          }
        }
      : undefined
  });

  useEffect(() => {
    // Register field with form store
    const unregister = registerField({
      changeValue: newValue => {
        if (isControlled) {
          // Force re-render for controlled components
          forceUpdate({});
          return;
        }
        // Handle uncontrolled component value updates
        const el = cref.current;

        if (!el) return;

        if (unControlledValueChange) {
          // Use custom value update function
          unControlledValueChange(el, newValue);
        } else {
          // Default: update DOM element value directly
          el.value = isNil(newValue) ? '' : (newValue as any);
        }
      },
      initialValue,
      name,
      preserve
    });

    // Set validation rules for this field
    setFieldRules(name, rules);

    // Cleanup: unregister field when component unmounts
    return () => {
      unregister();
    };
  }, []);

  // Render child component with all necessary props
  return (
    <Slot
      key={key}
      {...(valueProps as any)} // Value props (value or defaultValue)
      {...controlledProps} // Change handler props
      {...restValidateTriggerList} // Additional validation trigger handlers
      {...rest} // Other props passed to Field
      ref={cref} // Reference to child component
    >
      {children}
    </Slot>
  );
}

export default Field;

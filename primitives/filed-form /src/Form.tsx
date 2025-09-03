'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import type { ComponentPropsWithoutRef, ComponentRef, ElementType, HTMLProps, Ref } from 'react';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';

import type { FormInstance, InternalFormContext, InternalFormInstance, RegisterCallbackOptions } from './FieldContext';
import { FieldContextProvider } from './FieldContext';
import type { ValidateMessages } from './form-core/validate';
import useForm from './useForm';

interface FormBaseProps<Values = any> extends RegisterCallbackOptions<Values> {
  children?: React.ReactNode;
  clearOnDestroy?: boolean;
  form?: FormInstance<Values>;
  initialValues?: Partial<Values>;
  preserve?: boolean;
  validateMessages?: ValidateMessages;
  validateTrigger?: string | string[];
}

type PolymorphicProps<As extends ElementType, Own> = Own &
  Omit<ComponentPropsWithoutRef<As>, keyof Own> & {
    component?: As;
  };

export type FormProps<Values = any, As extends ElementType = 'form'> =
  | PolymorphicProps<As, FormBaseProps<Values>>
  | ({ component: false } & FormBaseProps<Values>);

// eslint-disable-next-line prettier/prettier
const Form = <Values=any, As extends ElementType = 'form'>(props: FormProps<Values, As>, ref: Ref<As>) => {
  const {
    children,
    clearOnDestroy,
    component: Component = 'form',
    form,
    initialValues,
    onFieldsChange,
    onFinish,
    onFinishFailed,
    onValuesChange,
    preserve = true,
    validateMessages,
    validateTrigger = 'onChange',
    ...rest
  } = props;

  const nativeElement = useRef<ComponentRef<As>>(null);

  const [formInstance] = useForm<Values>(form);

  const mountRef = useRef(false);

  const { destroyForm, setCallbacks, setInitialValues, setPreserve, setValidateMessages } = (
    formInstance as InternalFormInstance<Values>
  ).getInternalHooks();

  const formContextValue = useMemo<InternalFormContext<Values>>(
    () => ({
      ...formInstance,
      validateTrigger
    }),
    [formInstance, validateTrigger]
  );

  useImperativeHandle(ref as any, () => nativeElement.current);

  if (!mountRef.current) {
    setInitialValues(initialValues || {});

    setPreserve(preserve);

    setValidateMessages(validateMessages || {});

    setCallbacks({
      onFieldsChange,
      onFinish,
      onFinishFailed,
      onValuesChange
    });

    mountRef.current = true;
  }

  useEffect(() => {
    return () => {
      destroyForm(clearOnDestroy);
    };
  }, []);

  if (Component === false) {
    return <FieldContextProvider value={formContextValue}>{children}</FieldContextProvider>;
  }

  if (Component === 'form') {
    const { onReset, onSubmit, ...formProps } = rest as HTMLProps<HTMLFormElement>;

    return (
      <FieldContextProvider value={formContextValue}>
        <Component
          {...formProps}
          ref={nativeElement as Ref<HTMLFormElement>}
          onReset={e => {
            e.preventDefault();
            e.stopPropagation();
            onReset?.(e);
            formInstance.resetFields();
          }}
          onSubmit={e => {
            e.preventDefault();
            onSubmit?.(e);
            formInstance.submit();
          }}
        >
          {children}
        </Component>
      </FieldContextProvider>
    );
  }

  return (
    <FieldContextProvider value={formContextValue}>
      <Component
        {...(rest as any)}
        ref={nativeElement}
      >
        {children}
      </Component>
    </FieldContextProvider>
  );
};

Form.displayName = 'SkyrocForm';

const SkyrocForm = forwardRef(Form) as <Values = any, As extends ElementType = 'form'>(
  props: FormProps<Values, As> & { ref?: Ref<As> }
) => React.ReactElement;

export default SkyrocForm;

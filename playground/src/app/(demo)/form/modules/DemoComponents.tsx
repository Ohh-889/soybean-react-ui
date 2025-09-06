import { type ComponentProps, memo } from 'react';
import { useFieldState } from 'soybean-react-ui';

export const DemoInput = memo(
  (props: ComponentProps<'input'> & { name: string }) => {
    const { name, ...rest } = props;

    const state = useFieldState(name);
    const { touched, validated, validating } = state;

    return (
      <>
        <input
          className="flex w-full rounded-md border border-solid border-input bg-background file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 h-8 px-2.5 text-sm file:py-1.25 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          {...rest}
        />
        {touched && <span className="text-red-500">touched</span>}
        {validated && <span className="text-red-500">validated</span>}
        {validating && <span className="text-red-500">validating</span>}
      </>
    );
  },
  () => false
);

DemoInput.displayName = 'DemoInput';

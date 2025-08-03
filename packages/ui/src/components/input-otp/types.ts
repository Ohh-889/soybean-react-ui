import type { RenderProps } from 'input-otp';

import type { BaseComponentProps, ClassValue, ThemeSize } from '@/types/other';

import type { InputOTPSlots } from './input-otp-variants';

type OverrideProps<T, R> = Omit<T, keyof R> & R;

type OTPInputRootBaseProps = OverrideProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    className?: ClassValue;
    containerClassName?: string;
    maxLength: number;
    noScriptCSSFallback?: string | null;
    onChange?: (newValue: string) => unknown;
    onComplete?: (...args: any[]) => unknown;
    pasteTransformer?: (pasted: string) => string;
    pushPasswordManagerStrategy?: 'increase-width' | 'none';
    size?: ThemeSize;
    textAlign?: 'center' | 'left' | 'right';
    value?: string;
  }
>;

type InputOTPRenderFn = (props: RenderProps) => React.ReactNode;

export type InputOTPGroupProps = BaseComponentProps<'div'> & {
  separate?: boolean;
};

export type InputOTPRootProps = OTPInputRootBaseProps &
  (
    | {
        children?: never;
        render: InputOTPRenderFn;
      }
    | {
        children: React.ReactNode;
        render?: never;
      }
  );

export interface InputOTPSeparatorProps extends BaseComponentProps<'div'> {}

export interface InputOTPSlotProps extends BaseComponentProps<'div'> {
  index: number;
  mask?: boolean;
  separate?: boolean;
}

export type InputOTPClassNames = Partial<Record<InputOTPSlots, ClassValue>>;

export type InputOTPProps = Omit<OTPInputRootBaseProps, 'maxLength' | 'separate'> & {
  classNames?: InputOTPClassNames;
  inputCount?: number;
  mask?: boolean;
  separator?: React.ReactNode | true;
  size?: ThemeSize;
};

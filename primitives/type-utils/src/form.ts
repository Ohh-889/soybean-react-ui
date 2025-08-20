import type { Noop } from './fn';

export type CustomElement<T = any> = Partial<HTMLElement> &
  T & {
    checked?: boolean;
    disabled?: boolean;
    files?: FileList | null;
    focus?: Noop;
    options?: HTMLOptionsCollection;
    type?: string;
    value?: any;
  };

export type FieldElement<T = any> = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | CustomElement<T>;

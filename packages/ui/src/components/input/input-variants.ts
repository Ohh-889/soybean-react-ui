import { tv } from 'tailwind-variants';

export const inputVariants = tv({
  base: [
    `flex w-full rounded-md border border-solid border-input bg-background`,
    `file:border-0 file:bg-transparent file:font-medium`,
    'placeholder:text-muted-foreground selection:bg-primary',
    `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary`,
    `disabled:cursor-not-allowed disabled:opacity-50`,
    `aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`
  ],
  defaultVariants: {
    size: 'md'
  },
  variants: {
    size: {
      '2xl': 'h-12 px-4 text-xl file:py-2',
      lg: 'h-9 px-3 text-base file:py-1.25',
      md: 'h-8 px-2.5 text-sm file:py-1.25',
      sm: 'h-7 px-2 text-xs file:py-1.25',
      xl: 'h-10 px-3.5 text-lg file:py-1.25',
      xs: 'h-6 px-1.5 text-2xs file:py-1.25'
    }
  }
});

import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const keyboardKeyVariants = tv({
  defaultVariants: {
    size: 'md',
    variant: 'outline'
  },
  slots: {
    group: 'flex items-center',
    item: `inline-flex items-center justify-center w-fit font-medium rounded-sm`,
    separator: 'font-medium text-muted-foreground'
  },
  variants: {
    size: {
      '2xl': {
        group: 'gap-2',
        item: 'gap-1.5 h-8 min-w-8 px-1.5 text-lg'
      },
      lg: {
        group: 'gap-1.5',
        item: 'gap-1 h-6 min-w-6 px-1 text-sm'
      },
      md: {
        group: 'gap-1.25',
        item: 'gap-0.75 h-5 min-w-5 px-0.75 text-xs'
      },
      sm: {
        group: 'gap-1',
        item: 'gap-0.625 h-4.5 min-w-4.5 px-0.625 text-2xs'
      },
      xl: {
        group: 'gap-1.75',
        item: 'gap-1.25 h-7 min-w-7 px-1.25 text-base'
      },
      xs: {
        group: 'gap-0.75',
        item: 'gap-0.5 h-4 min-w-4 px-0.5 text-3xs'
      }
    },
    variant: {
      ghost: {
        item: 'border-border bg-muted text-muted-foreground border'
      },
      outline: {
        item: 'border-border bg-background text-muted-foreground border'
      },
      solid: {
        item: 'bg-muted-foreground text-muted'
      }
    }
  }
});

type KeyboardKeyVariants = VariantProps<typeof keyboardKeyVariants>;

export type KeyboardKeyVariant = NonNullable<KeyboardKeyVariants['variant']>;

export type KeyboardKeySlots = keyof typeof keyboardKeyVariants.slots;

import { tv } from 'tailwind-variants';

export const radioVariants = tv({
  defaultVariants: {
    color: 'primary',
    orientation: 'horizontal',
    size: 'md'
  },
  slots: {
    control: [
      'peer relative shrink-0 rounded-full border shadow',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:cursor-not-allowed disabled:opacity-50'
    ],
    group: 'flex',
    indicator: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-1/2 rounded-full ',
    label: '',
    root: 'flex items-center'
  },
  variants: {
    color: {
      accent: {
        control: `border-accent-foreground focus-visible:ring-accent-foreground/20`,
        indicator: `bg-accent-foreground/60`
      },
      carbon: {
        control: `border-carbon focus-visible:ring-carbon`,
        indicator: `bg-carbon`
      },
      destructive: {
        control: `border-destructive focus-visible:ring-destructive`,
        indicator: `bg-destructive`
      },
      info: {
        control: `border-info focus-visible:ring-info`,
        indicator: `bg-info`
      },
      primary: {
        control: `border-primary focus-visible:ring-primary`,
        indicator: `bg-primary`
      },
      secondary: {
        control: `border-secondary-foreground focus-visible:ring-secondary-foreground/20`,
        indicator: `bg-secondary-foreground/60`
      },
      success: {
        control: `border-success focus-visible:ring-success`,
        indicator: `bg-success`
      },
      warning: {
        control: `border-warning focus-visible:ring-warning`,
        indicator: `bg-warning`
      }
    },
    orientation: {
      horizontal: {
        group: 'items-center'
      },
      vertical: {
        group: 'flex-col'
      }
    },
    size: {
      '2xl': {
        control: 'size-6',
        group: 'gap-x-4.5 gap-y-3.5',
        root: 'gap-3.5'
      },
      lg: {
        control: 'size-4.5',
        group: 'gap-x-3.5 gap-y-2.5',
        root: 'gap-2.5'
      },
      md: {
        control: 'size-4',
        group: 'gap-x-3 gap-y-2',
        root: 'gap-2'
      },
      sm: {
        control: 'size-3.5',
        group: 'gap-x-2.5 gap-y-1.75',
        root: 'gap-1.75'
      },
      xl: {
        control: 'size-5',
        group: 'gap-x-4 gap-y-3',
        root: 'gap-3'
      },
      xs: {
        control: 'size-3',
        group: 'gap-x-2 gap-y-1.5',
        root: 'gap-1.5'
      }
    }
  }
});

export type RadioSlots = keyof typeof radioVariants.slots;

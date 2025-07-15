import { tv } from 'tailwind-variants';

export const checkboxVariants = tv({
  defaultVariants: {
    color: 'primary',
    orientation: 'horizontal',
    size: 'md'
  },
  slots: {
    control: [
      'peer shrink-0 rounded-sm border shadow',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ',
      'disabled:cursor-not-allowed disabled:opacity-50'
    ],
    groupRoot: 'flex',
    indicator: 'size-full flex items-center justify-center text-current',
    label: '',
    root: 'flex items-center'
  },
  variants: {
    color: {
      accent: {
        control: `border-accent-foreground/50 focus-visible:ring-accent-foreground/20 data-[state=checked]:bg-accent-foreground/5 data-[state=checked]:text-accent-foreground data-[state=indeterminate]:bg-accent-foreground/5 data-[state=indeterminate]:text-accent-foreground`
      },
      carbon: {
        control: `border-carbon focus-visible:ring-carbon data-[state=checked]:bg-carbon data-[state=checked]:text-carbon-foreground data-[state=indeterminate]:bg-carbon data-[state=indeterminate]:text-carbon-foreground`
      },
      destructive: {
        control: `border-destructive focus-visible:ring-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground data-[state=indeterminate]:bg-destructive data-[state=indeterminate]:text-destructive-foreground`
      },
      info: {
        control: `border-info focus-visible:ring-info data-[state=checked]:bg-info data-[state=checked]:text-info-foreground data-[state=indeterminate]:bg-info data-[state=indeterminate]:text-info-foreground`
      },
      primary: {
        control: `border-primary focus-visible:ring-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground`
      },
      secondary: {
        control: `border-secondary-foreground/50 focus-visible:ring-secondary-foreground/20 data-[state=checked]:bg-secondary-foreground/5 data-[state=checked]:text-secondary-foreground data-[state=indeterminate]:bg-secondary-foreground/5 data-[state=indeterminate]:text-secondary-foreground`
      },
      success: {
        control: `border-success focus-visible:ring-success data-[state=checked]:bg-success data-[state=checked]:text-success-foreground data-[state=indeterminate]:bg-success data-[state=indeterminate]:text-success-foreground`
      },
      warning: {
        control: `border-warning focus-visible:ring-warning data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground data-[state=indeterminate]:bg-warning data-[state=indeterminate]:text-warning-foreground`
      }
    },
    orientation: {
      horizontal: {
        groupRoot: 'items-center'
      },
      vertical: {
        groupRoot: 'flex-col'
      }
    },
    size: {
      '2xl': {
        control: 'size-6',
        groupRoot: 'gap-x-4.5 gap-y-3.5',
        root: 'gap-3.5'
      },
      lg: {
        control: 'size-4.5',
        groupRoot: 'gap-x-3.5 gap-y-2.5',
        root: 'gap-2.5'
      },
      md: {
        control: 'size-4',
        groupRoot: 'gap-x-3 gap-y-2',
        root: 'gap-2'
      },
      sm: {
        control: 'size-3.5',
        groupRoot: 'gap-x-2.5 gap-y-1.75',
        root: 'gap-1.75'
      },
      xl: {
        control: 'size-5',
        groupRoot: 'gap-x-4 gap-y-3',
        root: 'gap-3'
      },
      xs: {
        control: 'size-3',
        groupRoot: 'gap-x-2 gap-y-1.5',
        root: 'gap-1.5'
      }
    }
  }
});

export type CheckboxSlots = keyof typeof checkboxVariants.slots;

import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center font-medium transition-all-200 cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ],
  compoundVariants: [
    {
      class: `bg-destructive text-destructive-foreground hover:bg-destructive/80 active:bg-destructive-600`,
      color: 'destructive',
      variant: 'solid'
    },
    {
      class: `bg-success text-success-foreground hover:bg-success/80 active:bg-success-600`,
      color: 'success',
      variant: 'solid'
    },
    {
      class: `bg-warning text-warning-foreground hover:bg-warning/80 active:bg-warning-600`,
      color: 'warning',
      variant: 'solid'
    },
    {
      class: `bg-info text-info-foreground hover:bg-info/80 active:bg-info-600`,
      color: 'info',
      variant: 'solid'
    },
    {
      class: `bg-carbon text-carbon-foreground hover:bg-carbon/80 active:bg-carbon-600`,
      color: 'carbon',
      variant: 'solid'
    },
    {
      class: `bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary-foreground/20`,
      color: 'secondary',
      variant: 'solid'
    },
    {
      class: `bg-accent text-accent-foreground hover:bg-accent/80 active:bg-accent-foreground/20`,
      color: 'accent',
      variant: 'solid'
    },
    {
      class: 'text-primary',
      color: 'primary',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link']
    },
    {
      class: 'text-destructive',
      color: 'destructive',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link']
    },
    {
      class: 'text-success',
      color: 'success',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link']
    },
    {
      class: 'text-warning',
      color: 'warning',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link']
    },
    {
      class: 'text-info',
      color: 'info',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link']
    },
    {
      class: 'text-carbon',
      color: 'carbon',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link']
    },
    {
      class: 'text-secondary-foreground',
      color: 'secondary',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link']
    },
    {
      class: 'text-accent-foreground',
      color: 'accent',
      variant: ['outline', 'dashed', 'soft', 'ghost', 'link']
    },
    {
      class: 'hover:bg-primary/10 active:bg-primary/20',
      color: 'primary',
      variant: ['outline', 'dashed', 'ghost']
    },
    {
      class: 'hover:bg-destructive/10 active:bg-destructive/20',
      color: 'destructive',
      variant: ['outline', 'dashed', 'ghost']
    },
    {
      class: 'hover:bg-success/10 active:bg-success/20',
      color: 'success',
      variant: ['outline', 'dashed', 'ghost']
    },
    {
      class: 'hover:bg-warning/10 active:bg-warning/20',
      color: 'warning',
      variant: ['outline', 'dashed', 'ghost']
    },
    {
      class: 'hover:bg-info/10 active:bg-info/20',
      color: 'info',
      variant: ['outline', 'dashed', 'ghost']
    },
    {
      class: 'hover:bg-carbon/10 active:bg-carbon/20',
      color: 'carbon',
      variant: ['outline', 'dashed', 'ghost']
    },
    {
      class: 'hover:bg-secondary-foreground/10 active:bg-secondary-foreground/20',
      color: 'secondary',
      variant: ['outline', 'dashed', 'ghost']
    },
    {
      class: 'hover:bg-accent-foreground/10 active:bg-accent-foreground/20',
      color: 'accent',
      variant: ['outline', 'dashed', 'ghost']
    },
    {
      class: 'hover:border-primary hover:text-primary',
      color: 'primary',
      variant: 'plain'
    },
    {
      class: 'hover:border-destructive hover:text-destructive',
      color: 'destructive',
      variant: 'plain'
    },
    {
      class: 'hover:border-success hover:text-success',
      color: 'success',
      variant: 'plain'
    },
    {
      class: 'hover:border-warning hover:text-warning',
      color: 'warning',
      variant: 'plain'
    },
    {
      class: 'hover:border-info hover:text-info',
      color: 'info',
      variant: 'plain'
    },
    {
      class: 'hover:border-carbon hover:text-carbon',
      color: 'carbon',
      variant: 'plain'
    },
    {
      class: 'hover:border-secondary-foreground hover:text-secondary-foreground',
      color: 'secondary',
      variant: 'plain'
    },
    {
      class: 'hover:border-accent-foreground hover:text-accent-foreground',
      color: 'accent',
      variant: 'plain'
    },
    {
      class: 'border-primary',
      color: 'primary',
      variant: ['outline', 'dashed']
    },
    {
      class: 'border-destructive',
      color: 'destructive',
      variant: ['outline', 'dashed']
    },
    {
      class: 'border-success',
      color: 'success',
      variant: ['outline', 'dashed']
    },
    {
      class: 'border-warning',
      color: 'warning',
      variant: ['outline', 'dashed']
    },
    {
      class: 'border-info',
      color: 'info',
      variant: ['outline', 'dashed']
    },
    {
      class: 'border-carbon',
      color: 'carbon',
      variant: ['outline', 'dashed']
    },
    {
      class: 'border-secondary-foreground',
      color: 'secondary',
      variant: ['outline', 'dashed']
    },
    {
      class: 'border-accent-foreground',
      color: 'accent',
      variant: ['outline', 'dashed']
    },
    {
      class: 'bg-destructive/10 hover:bg-destructive/10 active:bg-destructive/20',
      color: 'destructive',
      variant: 'soft'
    },
    {
      class: 'bg-success/10 hover:bg-success/10 active:bg-success/20',
      color: 'success',
      variant: 'soft'
    },
    {
      class: 'bg-warning/10 hover:bg-warning/10 active:bg-warning/20',
      color: 'warning',
      variant: 'soft'
    },
    {
      class: 'bg-info/10 hover:bg-info/10 active:bg-info/20',
      color: 'info',
      variant: 'soft'
    },
    {
      class: 'bg-carbon/10 hover:bg-carbon/10 active:bg-carbon/20',
      color: 'carbon',
      variant: 'soft'
    },
    {
      class: 'bg-secondary-foreground/10 hover:bg-secondary-foreground/10 active:bg-secondary-foreground/20',
      color: 'secondary',
      variant: 'soft'
    },
    {
      class: 'bg-accent-foreground/10 hover:bg-accent-foreground/10 active:bg-accent-foreground/20',
      color: 'accent',
      variant: 'soft'
    },
    {
      class: 'shadow-none',
      shadow: ['sm', 'md', 'lg'],
      variant: ['ghost', 'link']
    },
    {
      class: 'active:shadow-md',
      shadow: 'sm',
      variant: 'plain'
    },
    {
      class: 'active:shadow-lg',
      shadow: 'md',
      variant: 'plain'
    },
    {
      class: 'active:shadow-xl',
      shadow: 'lg',
      variant: 'plain'
    },
    {
      class: 'active:shadow-sm',
      shadow: 'sm',
      variant: 'pure'
    },
    {
      class: 'active:shadow-md',
      shadow: 'md',
      variant: 'pure'
    },
    {
      class: 'active:shadow-lg',
      shadow: 'lg',
      variant: 'pure'
    },
    {
      class: 'p-0.75',
      fitContent: true,
      size: 'xs'
    },
    {
      class: 'p-0.875',
      fitContent: true,
      size: 'sm'
    },
    {
      class: 'p-1',
      fitContent: true,
      size: 'md'
    },
    {
      class: 'p-1.25',
      fitContent: true,
      size: 'lg'
    },
    {
      class: 'p-1.5',
      fitContent: true,
      size: 'xl'
    },
    {
      class: 'p-1.75',
      fitContent: true,
      size: '2xl'
    },
    {
      class: 'h-6 px-1.5',
      fitContent: false,
      size: 'xs'
    },
    {
      class: 'h-7 px-2',
      fitContent: false,
      size: 'sm'
    },
    {
      class: 'h-8 px-4',
      fitContent: false,
      size: 'md'
    },
    {
      class: 'h-9 px-6',
      fitContent: false,
      size: 'lg'
    },
    {
      class: 'h-10 px-8',
      fitContent: false,
      size: 'xl'
    },
    {
      class: 'h-12 px-10',
      fitContent: false,
      size: '2xl'
    },
    {
      class: 'w-6',
      fitContent: false,
      shape: ['square', 'circle'],
      size: 'xs'
    },
    {
      class: 'w-7',
      fitContent: false,
      shape: ['square', 'circle'],
      size: 'sm'
    },
    {
      class: 'w-9',
      fitContent: false,
      shape: ['square', 'circle'],
      size: 'lg'
    },
    {
      class: 'w-10',
      fitContent: false,
      shape: ['square', 'circle'],
      size: 'xl'
    },
    {
      class: 'w-12',
      fitContent: false,
      shape: ['square', 'circle'],
      size: '2xl'
    }
  ],
  defaultVariants: {
    color: 'primary',
    fitContent: false,
    shadow: 'sm',
    shape: 'auto',
    size: 'md',
    variant: 'solid'
  },

  variants: {
    color: {
      accent: `focus-visible:ring-accent-foreground/20`,
      carbon: `focus-visible:ring-carbon`,
      destructive: `focus-visible:ring-destructive`,
      info: `focus-visible:ring-info`,
      primary: `focus-visible:ring-primary`,
      secondary: `focus-visible:ring-secondary-foreground/20`,
      success: `focus-visible:ring-success`,
      warning: `focus-visible:ring-warning`
    },
    fitContent: {
      false: '',
      true: 'w-fit h-fit'
    },
    shadow: {
      lg: 'shadow-lg',
      md: 'shadow-md',
      none: 'shadow-none',
      sm: 'shadow-sm'
    },
    shape: {
      auto: 'rounded-md',
      circle: 'h-8 w-8 p-0 gap-0 rounded-full',
      rounded: 'rounded-full',
      square: 'h-8 w-8 p-0 gap-0 rounded-md'
    },
    size: {
      '2xl': 'gap-6 text-xl',
      lg: 'gap-4 text-base',
      md: 'gap-3 text-sm',
      sm: 'gap-2 text-xs',
      xl: 'gap-5 text-lg',
      xs: 'gap-1 text-2xs'
    },
    variant: {
      dashed: 'border border-dashed bg-background',
      ghost: 'bg-transparent',
      link: 'bg-transparent underline-offset-4 hover:underline',
      outline: 'border bg-background',
      plain: 'border border-border bg-background text-foreground',
      pure: 'border border-border bg-background text-accent-foreground hover:bg-accent/60 active:bg-accent',
      soft: 'bg-primary/10 hover:bg-primary/10 active:bg-primary/20',
      solid: 'bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary-600'
    }
  }
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonVariant = NonNullable<ButtonVariants['variant']>;

export type ButtonShape = NonNullable<ButtonVariants['shape']>;

export type ButtonShadow = NonNullable<ButtonVariants['shadow']>;

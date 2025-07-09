import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const tabsVariants = tv({
  compoundVariants: [
    { class: { content: 'mt-1.5', indicatorRoot: 'py-0.75' }, orientation: 'horizontal', size: 'xs' },
    { class: { content: 'ml-1.5', indicatorRoot: 'px-0.75' }, orientation: 'vertical', size: 'xs' },
    { class: { content: 'mt-1.75', indicatorRoot: 'py-1' }, orientation: 'horizontal', size: 'sm' },
    { class: { content: 'ml-1.75', indicatorRoot: 'px-1' }, orientation: 'vertical', size: 'sm' },
    { class: { content: 'mt-2', indicatorRoot: 'py-1' }, orientation: 'horizontal', size: 'md' },
    { class: { content: 'ml-2', indicatorRoot: 'px-1' }, orientation: 'vertical', size: 'md' },
    { class: { content: 'mt-2.5', indicatorRoot: 'py-1.125' }, orientation: 'horizontal', size: 'lg' },
    { class: { content: 'ml-2.5', indicatorRoot: 'px-1.125' }, orientation: 'vertical', size: 'lg' },
    { class: { content: 'mt-3', indicatorRoot: 'py-1.25' }, orientation: 'horizontal', size: 'xl' },
    { class: { content: 'ml-3', indicatorRoot: 'px-1.25' }, orientation: 'vertical', size: 'xl' },
    { class: { content: 'mt-3.5', indicatorRoot: 'py-1.5' }, orientation: 'horizontal', size: '2xl' },
    { class: { content: 'ml-3.5', indicatorRoot: 'px-1.5' }, orientation: 'vertical', size: '2xl' }
  ],
  defaultVariants: {
    enableIndicator: true,
    fill: 'auto',
    orientation: 'horizontal',
    size: 'md'
  },
  slots: {
    content: `flex-grow self-stretch overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary`,
    indicator: `size-full rounded-md bg-background shadow`,
    indicatorRoot: `absolute top-0 left-0 z-2 transition-all duration-300`,
    list: 'relative inline-flex justify-center items-center rounded-md bg-muted text-muted-foreground',
    root: `flex`,
    trigger: [
      `relative z-3 inline-flex items-center justify-center flex-1 whitespace-nowrap rounded-md font-medium ease-in transition-all duration-200`,
      `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary`,
      `disabled:pointer-events-none disabled:opacity-50`
    ]
  },
  variants: {
    enableIndicator: {
      false: {
        trigger: `data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow`
      }
    },
    fill: {
      auto: {
        root: `items-start`
      },
      full: {
        root: `items-stretch`
      }
    },
    orientation: {
      horizontal: {
        indicatorRoot: `h-full w-(--soybean-tabs-indicator-size) translate-x-(--soybean-tabs-indicator-position)`,
        root: `flex-col`
      },
      vertical: {
        indicatorRoot: `w-full h-(--soybean-tabs-indicator-size) translate-y-(--soybean-tabs-indicator-position)`,
        list: `flex-col`
      }
    },
    size: {
      '2xl': {
        list: `p-1.5`,
        root: 'text-xl',
        trigger: `gap-4 px-6 py-1.5`
      },
      lg: {
        list: `p-1.125`,
        root: 'text-base',
        trigger: `gap-2.5 px-4 py-1.125`
      },
      md: {
        list: `p-1`,
        root: 'text-sm',
        trigger: `gap-2 px-3 py-1`
      },
      sm: {
        list: `p-0.875`,
        root: 'text-xs',
        trigger: `gap-1.5 px-2 py-1`
      },
      xl: {
        list: `p-1.25`,
        root: 'text-lg',
        trigger: `gap-3 px-5 py-1.25`
      },
      xs: {
        list: `p-0.75`,
        root: 'text-2xs',
        trigger: `gap-1 px-1.5 py-0.75`
      }
    }
  }
});

export type TabsSlots = keyof typeof tabsVariants.slots;
export type TabsProps = VariantProps<typeof tabsVariants>;
export type TabsFill = NonNullable<TabsProps['fill']>;

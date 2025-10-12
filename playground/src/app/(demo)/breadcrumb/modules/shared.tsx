import { AlertCircle, Component, Dock, Home } from 'lucide-react';
import type { BreadcrumbItem, ThemeSize } from 'skyroc-ui';

export const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export const items: BreadcrumbItem[] = [
  {
    label: 'Home',
    leading: <Home />,
    value: 'home'
  },
  {
    label: 'Components',
    leading: <Component />,
    trailing: (
      <span className="rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
        New
      </span>
    ),
    value: 'components'
  },
  {
    label: 'Breadcrumb',
    leading: <Dock />,
    value: 'breadcrumb'
  }
];

export const items2: BreadcrumbItem[] = [
  {
    label: 'Home',
    leading: <Home />,
    value: 'home'
  },
  {
    href: 'https://react.dev',
    label: 'React',
    target: '_blank',
    value: 'react'
  },
  {
    href: 'https://soybean-ui.com',
    label: 'SoybeanUI',
    target: '_blank',
    value: 'soybean-ui'
  }
];

export const items3: BreadcrumbItem[] = items.concat([
  {
    label: 'Components2',
    leading: <Component />,
    value: 'components2'
  },
  {
    label: 'Breadcrumb2',
    leading: <Dock />,
    value: 'breadcrumb2'
  }
]);

export const items4: BreadcrumbItem[] = [
  {
    label: 'Alert',
    leading: <AlertCircle />,
    value: '/alert'
  },
  {
    label: 'Button',
    leading: <AlertCircle />,
    value: '/button'
  },
  {
    label: 'Card',
    leading: <AlertCircle />,
    value: '/card'
  },
  {
    label: 'divider',
    leading: <AlertCircle />,
    value: '/divider'
  }
];

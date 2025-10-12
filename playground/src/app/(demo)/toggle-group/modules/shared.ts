import type { ToggleGroupProps } from 'skyroc-ui';

export const items: ToggleGroupProps['items'] = [
  { disabled: false, label: 'Top', value: 'top' },
  { disabled: false, label: 'Right', value: 'right' },
  { disabled: false, label: 'Bottom', value: 'bottom' },
  { disabled: false, label: 'Left', value: 'left' }
];

export const items2: ToggleGroupProps['items'] = [
  { disabled: false, label: 'Top', value: 'top' },
  { disabled: true, label: 'Right', value: 'right' },
  { disabled: false, label: 'Bottom', value: 'bottom' },
  { disabled: false, label: 'Left', value: 'left' }
];

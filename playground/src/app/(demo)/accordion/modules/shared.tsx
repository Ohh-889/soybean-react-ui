import { Earth, Info, Rocket } from 'lucide-react';
import type { AccordionItemData, ThemeSize } from 'soybean-react-ui';
import { Badge } from 'soybean-react-ui';

export const items: AccordionItemData[] = [
  {
    children: 'Yes. It adheres to the WAI-ARIA design pattern.',
    leading: <Info />,
    title: 'Is it accessible?',
    trailing: <Badge variant="soft">Badge</Badge>,
    value: '1'
  },
  {
    children: "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    leading: <Rocket />,
    title: 'Is it unstyled?',
    value: '2'
  },
  {
    children: 'Yes! You can use the transition prop to configure the animation.',
    leading: <Earth />,
    title: 'Can it be animated?',
    value: '3'
  }
];

export const items2: AccordionItemData[] = [
  {
    children: 'Yes. It adheres to the WAI-ARIA design pattern.',
    title: 'Is it accessible?',
    value: '1'
  },
  {
    children: 'Yes. It adheres to the WAI-ARIA design pattern.',
    title: 'Is it accessible?',
    value: '2'
  },
  {
    children: 'Yes. It adheres to the WAI-ARIA design pattern.',
    leading: <Earth />,
    title: 'Is it accessible?',
    value: '3'
  }
];

export const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

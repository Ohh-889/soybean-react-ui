import { Calendar, HelpCircle, Mail, Rocket, Settings, Smile, User } from 'lucide-react';
import type { CommandProps } from 'skyroc-ui';

export const items: CommandProps['items'] = [
  {
    children: [
      {
        label: 'Calendar',
        leading: <Calendar />,
        value: 'calendar'
      },
      {
        label: 'Search Emoji',
        leading: <Smile />,
        value: 'search-emoji'
      },
      {
        label: 'Launch',
        leading: <Rocket />,
        value: 'launch'
      }
    ],
    label: 'Suggestions'
  },
  { type: 'separator' },
  {
    children: [
      {
        label: 'Profile',
        leading: <User />,
        shortcut: ['command', 'p'],
        value: 'profile'
      },
      {
        label: 'Mail',
        leading: <Mail />,
        shortcut: ['command', 'm'],
        value: 'mail'
      },
      {
        label: 'Settings',
        leading: <Settings />,
        shortcut: ['command', 's'],
        value: 'settings'
      }
    ],
    label: 'Settings'
  },
  { alwaysRender: true, type: 'separator' },
  {
    label: 'Help',
    leading: <HelpCircle />,
    shortcut: ['command', 'h'],
    value: 'help'
  }
];

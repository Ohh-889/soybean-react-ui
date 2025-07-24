import {
  ArrowUpRight,
  CirclePlus,
  Cloud,
  CreditCard,
  Facebook,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageCircle,
  Settings,
  Twitter,
  User,
  UserPlus,
  Users
} from 'lucide-react';
import Link from 'next/link';
import type { DropdownMenuCheckboxProps, DropdownMenuProps, DropdownMenuRadioProps } from 'soybean-react-ui';
import { toast } from 'soybean-react-ui';

import config from '../../../../config';

export const menus: DropdownMenuProps['items'] = [
  {
    label: 'My Account',
    type: 'label'
  },
  {
    type: 'separator'
  },
  {
    label: 'Profile',
    leading: <User className="text-primary" />,
    onClick: () => {
      toast.success('Profile', {
        description: 'Profile',
        duration: 1000,
        position: 'top-center'
      });
    },
    shortcut: ['command', 'shift', 'p']
  },
  { label: 'Billing', leading: <CreditCard />, shortcut: ['command', 'b'] },
  { label: 'Settings', leading: <Settings />, shortcut: ['command', 's'] },
  {
    label: 'Keyboard shortcuts',
    leading: <Keyboard />,
    shortcut: ['command', 'k']
  },
  { type: 'separator' },
  { label: 'Team', leading: <Users />, shortcut: ['command', 'shift', 't'] },
  {
    label: (
      <Link
        href={config.githubUrl}
        target="_blank"
      >
        Github
      </Link>
    ),
    leading: <Github />,
    trailing: <ArrowUpRight className="shrink-0 self-start text-muted-foreground size-3 -ml-2" />
  },
  {
    children: [
      {
        label: 'Email',
        leading: <Mail />,
        shortcut: ['command', 'shift', 'e']
      },
      {
        label: 'Facebook',
        leading: <Facebook />,
        shortcut: ['command', 'shift', 'f']
      },
      {
        label: 'Twitter',
        leading: <Twitter />,
        shortcut: ['command', 'shift', 't']
      },
      {
        children: [
          {
            label: 'Message',
            leading: <MessageCircle />,
            shortcut: ['command', 'm']
          }
        ],
        label: 'More',
        leading: <CirclePlus />,
        type: 'sub'
      }
    ],
    label: 'Invite Users',
    leading: <UserPlus />,
    type: 'sub'
  },
  {
    type: 'separator'
  },
  { label: 'Support', leading: <LifeBuoy /> },
  { disabled: true, label: 'API', leading: <Cloud /> },
  { type: 'separator' },
  {
    label: 'Sign out',
    leading: <LogOut />,
    shortcut: ['command', 'shift', 'Q']
  }
];

export const menus2: DropdownMenuCheckboxProps['items'] = [
  { label: 'My Account', type: 'label' },
  { type: 'separator' },
  { label: 'Profile', leading: <User />, shortcut: '⇧⌘P', textValue: 'Profile' },
  { label: 'Billing', leading: <CreditCard />, shortcut: '⌘B', textValue: 'Billing' },
  { type: 'separator' },
  { label: 'Settings', leading: <Settings />, shortcut: '⌘S', textValue: 'Settings' },
  { type: 'separator' },
  { label: 'Keyboard shortcuts', leading: <Keyboard />, shortcut: '⌘K', textValue: 'Keyboard shortcuts' }
];

export const menus3: DropdownMenuRadioProps['items'] = [
  { label: 'Tooltip Placement', type: 'label' },
  { type: 'separator' },
  { label: 'Top Start', value: 'top-start' },
  { label: 'Top', value: 'top' },
  { label: 'Top End', value: 'top-end' },
  { label: 'Right Start', value: 'right-start' },
  { label: 'Right', value: 'right' },
  { label: 'Right End', value: 'right-end' },
  { label: 'Bottom Start', value: 'bottom-start' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Bottom End', value: 'bottom-end' },
  { label: 'Left Start', value: 'left-start' },
  { label: 'Left', value: 'left' },
  { label: 'Left End', value: 'left-end' }
];

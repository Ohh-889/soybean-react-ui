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
import config from '../../../../config';
import type { DropdownMenuCheckboxProps, DropdownMenuProps, DropdownMenuRadioProps } from 'soybean-react-ui';
import { toast } from 'soybean-react-ui';

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
  { type: 'label', label: 'My Account' },
  { type: 'separator' },
  { label: 'Profile', leading: <User />, shortcut: '⇧⌘P', textValue: 'Profile' },
  { label: 'Billing', leading: <CreditCard />, shortcut: '⌘B', textValue: 'Billing' },
  { type: 'separator' },
  { label: 'Settings', leading: <Settings />, shortcut: '⌘S', textValue: 'Settings' },
  { type: 'separator' },
  { label: 'Keyboard shortcuts', leading: <Keyboard />, shortcut: '⌘K', textValue: 'Keyboard shortcuts' }
];

export const menus3: DropdownMenuRadioProps['items'] = [
  { type: 'label', label: 'Tooltip Placement' },
  { type: 'separator' },
  { value: 'top-start', label: 'Top Start' },
  { value: 'top', label: 'Top' },
  { value: 'top-end', label: 'Top End' },
  { value: 'right-start', label: 'Right Start' },
  { value: 'right', label: 'Right' },
  { value: 'right-end', label: 'Right End' },
  { value: 'bottom-start', label: 'Bottom Start' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'bottom-end', label: 'Bottom End' },
  { value: 'left-start', label: 'Left Start' },
  { value: 'left', label: 'Left' },
  { value: 'left-end', label: 'Left End' }
];

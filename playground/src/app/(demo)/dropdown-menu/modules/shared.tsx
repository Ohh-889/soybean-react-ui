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
    leading: <User className="shrink-0 text-muted-foreground" />,
    onClick: () => {
      toast.success('Profile', {
        description: 'Profile',
        duration: 1000,
        position: 'top-center'
      });
    },
    shortcut: ['command', 'shift', 'p']
  },
  { label: 'Billing', leading: <CreditCard className="shrink-0 text-muted-foreground" />, shortcut: ['command', 'b'] },
  { label: 'Settings', leading: <Settings className="shrink-0 text-muted-foreground" />, shortcut: ['command', 's'] },
  {
    label: 'Keyboard shortcuts',
    leading: <Keyboard className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'k']
  },
  { type: 'separator' },
  { label: 'Team', leading: <Users className="shrink-0 text-muted-foreground" />, shortcut: ['command', 'shift', 't'] },
  {
    label: (
      <Link
        href="https://github.com"
        target="_blank"
      >
        Github
      </Link>
    ),
    leading: <Github className="shrink-0 text-muted-foreground" />,
    trailing: <ArrowUpRight className="shrink-0 self-start text-muted-foreground size-3 -ml-2" />
  },
  {
    children: [
      {
        label: 'Email',
        leading: <Mail className="shrink-0 text-muted-foreground" />,
        shortcut: ['command', 'shift', 'e']
      },
      {
        label: 'Facebook',
        leading: <Facebook className="shrink-0 text-muted-foreground" />,
        shortcut: ['command', 'shift', 'f']
      },
      {
        label: 'Twitter',
        leading: <Twitter className="shrink-0 text-muted-foreground" />,
        shortcut: ['command', 'shift', 't']
      },
      {
        children: [
          {
            label: 'Message',
            leading: <MessageCircle className="shrink-0 text-muted-foreground" />,
            shortcut: ['command', 'm']
          }
        ],
        label: 'More',
        leading: <CirclePlus className="shrink-0 text-muted-foreground" />,
        type: 'sub'
      }
    ],
    label: 'Invite Users',
    leading: <UserPlus className="shrink-0 text-muted-foreground" />,
    type: 'sub'
  },
  {
    type: 'separator'
  },
  { label: 'Support', leading: <LifeBuoy className="shrink-0 text-muted-foreground" /> },
  { disabled: true, label: 'API', leading: <Cloud className="shrink-0 text-muted-foreground" /> },
  { type: 'separator' },
  {
    label: 'Sign out',
    leading: <LogOut className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'shift', 'Q']
  }
];

export const menus2: DropdownMenuCheckboxProps['items'] = [
  {
    label: 'My Account',
    type: 'label'
  },
  {
    type: 'separator'
  },
  {
    label: 'Profile',
    leading: <User className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'shift', 'p'],
    textValue: '01'
  },
  {
    label: 'Billing',
    leading: <CreditCard className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'b'],
    textValue: '02'
  },
  {
    label: 'Settings',
    leading: <Settings className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 's'],
    textValue: '03'
  },
  {
    label: 'Keyboard shortcuts',
    leading: <Keyboard className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'k'],
    textValue: '04'
  },
  { type: 'separator' },
  {
    label: 'Team',
    leading: <Users className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'shift', 't'],
    textValue: '05'
  },
  {
    label: (
      <Link
        href="https://github.com"
        target="_blank"
      >
        Github
      </Link>
    ),
    leading: <Github className="shrink-0 text-muted-foreground" />,
    textValue: '06',
    trailing: <ArrowUpRight className="shrink-0 self-start text-muted-foreground size-3 -ml-2" />
  },
  {
    label: 'Invite Users',
    leading: <UserPlus className="shrink-0 text-muted-foreground" />,
    textValue: '07'
  },
  {
    type: 'separator'
  },
  { label: 'Support', leading: <LifeBuoy className="shrink-0 text-muted-foreground" />, textValue: '08' },
  { disabled: true, label: 'API', leading: <Cloud className="shrink-0 text-muted-foreground" />, textValue: '09' },
  { type: 'separator' },
  {
    label: 'Sign out',
    leading: <LogOut className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'shift', 'Q'],
    textValue: '10'
  }
];

export const menus3: DropdownMenuRadioProps['items'] = [
  {
    label: 'My Account',
    type: 'label'
  },
  {
    type: 'separator'
  },
  {
    label: 'Profile',
    leading: <User className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'shift', 'p'],
    value: '01'
  },
  {
    label: 'Billing',
    leading: <CreditCard className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'b'],
    value: '02'
  },
  {
    label: 'Settings',
    leading: <Settings className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 's'],
    value: '03'
  },
  {
    label: 'Keyboard shortcuts',
    leading: <Keyboard className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'k'],
    value: '04'
  },
  { type: 'separator' },
  {
    label: 'Team',
    leading: <Users className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'shift', 't'],
    value: '05'
  },
  {
    label: (
      <Link
        href="https://github.com"
        target="_blank"
      >
        Github
      </Link>
    ),
    leading: <Github className="shrink-0 text-muted-foreground" />,
    trailing: <ArrowUpRight className="shrink-0 self-start text-muted-foreground size-3 -ml-2" />,
    value: '06'
  },
  {
    label: 'Invite Users',
    leading: <UserPlus className="shrink-0 text-muted-foreground" />,
    value: '07'
  },
  {
    type: 'separator'
  },
  { label: 'Support', leading: <LifeBuoy className="shrink-0 text-muted-foreground" />, value: '08' },
  { disabled: true, label: 'API', leading: <Cloud className="shrink-0 text-muted-foreground" />, value: '09' },
  { type: 'separator' },
  {
    label: 'Sign out',
    leading: <LogOut className="shrink-0 text-muted-foreground" />,
    shortcut: ['command', 'shift', 'Q'],
    value: '10'
  }
];

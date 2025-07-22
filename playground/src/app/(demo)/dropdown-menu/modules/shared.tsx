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
import type { DropdownMenuProps } from 'soybean-react-ui';
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

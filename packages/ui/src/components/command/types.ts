import type {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandRoot,
  CommandSeparator
} from 'cmdk';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { BaseComponentProps, BaseNodeProps, ClassValue, PropsSlot, ThemeSize } from '@/types/other';

import type { DialogClassNames, DialogProps } from '../dialog';

import type { CommandSlots } from './command-variants';

export type CommandClassNames = Partial<Record<CommandSlots, ClassValue>>;

export type CommandEmptyProps = BaseNodeProps<ComponentPropsWithoutRef<typeof CommandEmpty>>;

export type CommandGroupProps = BaseNodeProps<ComponentPropsWithoutRef<(typeof Command)['Group']>> & {
  classNames?: Pick<CommandClassNames, 'group' | 'groupLabel'>;
};

export type CommandInputProps = BaseNodeProps<Omit<ComponentPropsWithoutRef<typeof CommandInput>, 'size'>> & {
  classNames?: Pick<CommandClassNames, 'input' | 'inputIcon' | 'inputWrapper'>;
} & PropsSlot;

export type CommandItemProps = BaseNodeProps<ComponentPropsWithoutRef<typeof CommandItem>> & {
  shortcut?: string | string[];
} & PropsSlot;

export type CommandListProps = BaseNodeProps<ComponentPropsWithoutRef<typeof CommandList>>;

export type CommandRootProps = BaseNodeProps<ComponentPropsWithoutRef<typeof CommandRoot>>;

export type CommandSeparatorProps = BaseNodeProps<ComponentPropsWithoutRef<typeof CommandSeparator>>;

export type CommandShortcutProps = BaseComponentProps<'div'> & {
  value?: string | string[];
};

export type CommandGroupOptionProps = Omit<CommandGroupProps, 'children' | 'heading'> & {
  children: CommandOptionData[];
  label?: ReactNode;
  type?: 'group';
};

export type CommandSeparatorOptionProps = CommandSeparatorProps & {
  type: 'separator';
};

export type CommandItemOptionProps = Omit<CommandItemProps, 'children'> & {
  label?: ReactNode;
  type?: 'item';
};

export type CommandOptionData = CommandGroupOptionProps | CommandSeparatorOptionProps | CommandItemOptionProps;

export type CommandOptionProps = {
  classNames?: CommandClassNames;
  item: CommandOptionData;
  size?: ThemeSize;
};

export interface CommandProps extends CommandRootProps {
  classNames?: CommandClassNames;
  empty?: ReactNode;
  inputProps?: CommandInputProps;
  items: CommandOptionData[];
}

export interface CommandDialogProps
  extends Omit<DialogProps, 'classNames' | 'description' | 'footer' | 'title' | 'trigger'> {
  classNames?: Pick<DialogClassNames, 'close' | 'content' | 'overlay'>;
}

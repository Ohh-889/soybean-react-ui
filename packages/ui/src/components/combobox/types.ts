import type { CommandProps } from '../command';
import type { PopoverProps } from '../popover';

export type ComboboxProps = CommandProps &
  PopoverProps & {
    mode?: 'modern' | 'traditional';
  };

import type {
  DropdownMenuLabelOption,
  DropdownMenuOptionData,
  DropdownMenuSeparatorOption,
  DropdownMenuSubOption
} from './types';

export function isLabel(opt: DropdownMenuOptionData): opt is DropdownMenuLabelOption {
  return opt.type === 'label';
}
export function isSeparator(opt: DropdownMenuOptionData): opt is DropdownMenuSeparatorOption {
  return opt.type === 'separator';
}

export function isSub(opt: DropdownMenuOptionData): opt is DropdownMenuSubOption {
  return opt.type === 'sub';
}

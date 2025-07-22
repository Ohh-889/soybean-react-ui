import { Group, Portal, Sub } from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib';

import DropdownMenuItem from './DropdownMenuItem';
import DropdownMenuLabel from './DropdownMenuLabel';
import DropdownMenuSeparator from './DropdownMenuSeparator';
import DropdownMenuSubContent from './DropdownMenuSubContent';
import DropdownMenuSubTrigger from './DropdownMenuSubTrigger';
import type {
  DropdownMenuLabelOption,
  DropdownMenuOptionData,
  DropdownMenuOptionProps,
  DropdownMenuSeparatorOption,
  DropdownMenuSubOption
} from './types';

function isLabel(opt: DropdownMenuOptionData): opt is DropdownMenuLabelOption {
  return opt.type === 'label';
}
function isSeparator(opt: DropdownMenuOptionData): opt is DropdownMenuSeparatorOption {
  return opt.type === 'separator';
}

function isSub(opt: DropdownMenuOptionData): opt is DropdownMenuSubOption {
  return opt.type === 'sub';
}

const DropdownMenuOption = (props: DropdownMenuOptionProps) => {
  const { classNames, item, size } = props;

  if (isSeparator(item)) {
    return (
      <DropdownMenuSeparator
        {...item}
        className={classNames?.separator}
        size={size}
      />
    );
  }

  if (isLabel(item)) {
    return (
      <DropdownMenuLabel
        classNames={classNames}
        size={size}
        {...item}
      >
        {item.label}
      </DropdownMenuLabel>
    );
  }

  if (isSub(item)) {
    const { label, subContentProps, subProps, ...subTriggerProps } = item;
    return (
      <Sub {...subProps}>
        <DropdownMenuSubTrigger {...subTriggerProps}>{label}</DropdownMenuSubTrigger>

        <Portal>
          <DropdownMenuSubContent
            {...subContentProps}
            className={classNames?.subContent}
            size={size}
          >
            <Group className={cn(classNames?.subContent)}>
              {item.children.map((child, index) => {
                return (
                  <DropdownMenuOption
                    item={child}
                    key={String(index)}
                  />
                );
              })}
            </Group>
          </DropdownMenuSubContent>
        </Portal>
      </Sub>
    );
  }

  return (
    <DropdownMenuItem
      classNames={classNames}
      size={size}
      {...item}
    >
      {item.label}
    </DropdownMenuItem>
  );
};

DropdownMenuOption.displayName = 'DropdownMenuOption';

export default DropdownMenuOption;

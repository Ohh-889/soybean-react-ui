/* eslint-disable unocss/order */
import { CommandEmpty, CommandInput, CommandList, CommandOption, CommandRoot } from '../command';
import { PopoverAnchor, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from '../popover';

import type { ComboboxProps } from './types';

const Combobox = (props: ComboboxProps) => {
  const {
    className,
    classNames,
    empty = 'No results.',
    inputProps,
    items,
    mode = 'modern',
    size,
    trigger,
    ...rest
  } = props;

  return (
    <PopoverRoot>
      {mode === 'modern' && <PopoverTrigger asChild>{trigger}</PopoverTrigger>}
      <PopoverPortal>
        <PopoverContent className="w-(--radix-popover-trigger-width)">
          <CommandRoot
            {...rest}
            className={className || classNames?.root}
          >
            <CommandList
              className={classNames?.list}
              size={size}
            >
              <CommandEmpty
                className={classNames?.empty}
                size={size}
              >
                {empty}
              </CommandEmpty>

              {items.map((item, index) => (
                <CommandOption
                  classNames={classNames}
                  item={item}
                  key={String(index)}
                  size={size}
                />
              ))}
            </CommandList>
          </CommandRoot>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
};

export default Combobox;

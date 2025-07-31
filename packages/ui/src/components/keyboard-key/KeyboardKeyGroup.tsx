import { Fragment } from 'react';

import { cn } from '@/lib/utils';

import KeyboardKey from './KeyboardKey';
import { keyboardKeyVariants } from './keyboard-key-variants';
import type { KeyboardKeyGroupProps } from './types';

const KeyboardKeyGroup = (props: KeyboardKeyGroupProps) => {
  const { className, classNames, separator = '+', size, values, variant, ...rest } = props;

  const { group, separator: separatorCls } = keyboardKeyVariants({ size, variant });

  const mergedCls = cn(group(), className || classNames?.group);

  const separatorMergedCls = cn(separatorCls(), classNames?.separator);

  return (
    <div
      {...rest}
      className={mergedCls}
      data-size={size}
      data-slot="keyboard-key-group"
      data-variant={variant}
    >
      {values?.map((value, index) => (
        <Fragment key={String(index)}>
          <KeyboardKey
            className={classNames?.item}
            size={size}
            value={value}
            variant={variant}
          />

          {separator && index !== values.length - 1 && <span className={separatorMergedCls}>{separator}</span>}
        </Fragment>
      ))}
    </div>
  );
};

export default KeyboardKeyGroup;

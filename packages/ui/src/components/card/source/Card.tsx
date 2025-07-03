import { cardVariants, cn } from '@skyroc-ui/variants';
import React, { isValidElement } from 'react';

import { If } from '../../if';
import type { CardProps } from '../type';

import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardRoot } from './CardRoot';
import { CardTitle } from './CardTitle';
import { CardTitleRoot } from './CardTitleRoot';

export const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    children,
    className,
    classNames,
    extra,
    flexHeight,
    footer,
    header,
    size,
    split,
    title,
    titleLeading,
    titleRoot,
    titleTrailing,
    ...rest
  } = props;

  const showHeader = Boolean(header || title || extra);

  const { root } = cardVariants({ size, split });

  const mergedCls = cn(root(), className);

  return (
    <CardRoot
      className={mergedCls}
      {...rest}
      ref={ref}
    >
      <If condition={showHeader}>
        <CardHeader
          className={classNames?.header}
          size={size}
        >
          <If
            condition={!header}
            fallback={header}
          >
            <If
              condition={!titleRoot}
              fallback={titleRoot}
            >
              <CardTitleRoot
                className={classNames?.titleRoot}
                size={size}
              >
                {titleLeading}
                <If
                  condition={!isValidElement(title)}
                  fallback={title}
                >
                  <CardTitle
                    className={classNames?.title}
                    size={size}
                  >
                    {title}
                  </CardTitle>
                </If>
                {titleTrailing}
              </CardTitleRoot>
            </If>

            {extra}
          </If>
        </CardHeader>
      </If>
      <CardContent
        className={classNames?.content}
        flexHeight={flexHeight}
        size={size}
      >
        {children}
      </CardContent>

      <If
        condition={!isValidElement(footer) && Boolean(footer)}
        fallback={footer}
      >
        <CardFooter
          className={classNames?.footer}
          size={size}
        >
          {footer}
        </CardFooter>
      </If>
    </CardRoot>
  );
});

Card.displayName = 'Card';

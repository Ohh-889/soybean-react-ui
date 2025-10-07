'use client';

import cn from 'clsx';
import type { ComponentProps, FC } from 'react';

const createHeading = (Tag: `h${1 | 2 | 3 | 4 | 5 | 6}`): FC<ComponentProps<typeof Tag>> =>
  function Heading({ children, className, id, ...props }: ComponentProps<typeof Tag>) {
    const _class =
      className === 'sr-only'
        ? 'sr-only'
        : cn(
            'group scroll-mt-20 tracking-tight font-semibold',
            {
              h1: cn('scroll-m-20 text-4xl font-extrabold tracking-tight text-balance'),
              h2: cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'),
              h3: cn('mt-10 mb-4 text-xl md:text-2xl', 'font-semibold leading-[1.4]', 'relative'),
              h4: cn('mt-8 mb-3 text-lg md:text-xl', 'font-semibold leading-[1.5]', 'text-foreground/90'),
              h5: cn('mt-6 mb-2 text-base md:text-lg', 'font-semibold leading-[1.6]', 'text-foreground/80'),
              h6: cn(
                'mt-6 mb-2 text-sm md:text-base',
                'font-semibold leading-[1.6]',
                'text-muted-foreground uppercase tracking-wider'
              )
            }[Tag],
            className
          );

    return (
      <Tag
        className={_class}
        id={id}
        {...props}
      >
        {children}
      </Tag>
    );
  };

export const H1 = createHeading('h1');
export const H2 = createHeading('h2');
export const H3 = createHeading('h3');
export const H4 = createHeading('h4');
export const H5 = createHeading('h5');
export const H6 = createHeading('h6');

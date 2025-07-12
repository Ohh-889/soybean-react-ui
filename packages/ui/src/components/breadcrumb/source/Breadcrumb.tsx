'use client';

import type { Ref } from 'react';
import { Fragment, forwardRef } from 'react';

import type { BreadcrumbItem, BreadcrumbProps } from '../types';

import BreadcrumbEllipsis from './BreadcrumbEllipsis';
import BreadcrumbItemContent from './BreadcrumbItem';
import BreadcrumbLink from './BreadcrumbLink';
import BreadcrumbList from './BreadcrumbList';
import BreadcrumbPage from './BreadcrumbPage';
import BreadcrumbRoot from './BreadcrumbRoot';
import BreadcrumbSeparator from './BreadcrumbSeparator';

type EllipsisProps<T extends BreadcrumbItem> = Pick<
  BreadcrumbProps<T>,
  'className' | 'ellipsisIcon' | 'items' | 'renderEllipsis'
>;

const Ellipsis = <T extends BreadcrumbItem>({ className, ellipsisIcon, items, renderEllipsis }: EllipsisProps<T>) => {
  if (!renderEllipsis) return <BreadcrumbEllipsis className={className}>{ellipsisIcon}</BreadcrumbEllipsis>;

  return renderEllipsis(items);
};

function renderBreadcrumbContent<T extends BreadcrumbItem>(item: T, renderItem: BreadcrumbProps<T>['renderItem']) {
  if (renderItem) return renderItem(item);

  if (item.href) return <BreadcrumbLink {...item}>{item.label}</BreadcrumbLink>;

  return <BreadcrumbPage {...item}>{item.label}</BreadcrumbPage>;
}

const Breadcrumb = <T extends BreadcrumbItem>(props: BreadcrumbProps<T>, ref: Ref<HTMLElement>) => {
  const {
    className,
    classNames,
    ellipsis,
    ellipsisIcon,
    handleItemClick,
    items,
    renderEllipsis,
    renderItem,
    separator,
    size,
    ...rest
  } = props;

  const computedEllipsisRange = getEllipsisRange();

  const itemsFilterEllipsis = getItemsFilterEllipsis();

  const startEllipsisIndex = computedEllipsisRange?.[0];

  const ellipsisItems = computedEllipsisRange ? items.slice(computedEllipsisRange[0], computedEllipsisRange[1]) : [];

  function getItemsFilterEllipsis() {
    if (!computedEllipsisRange) return items;

    const [start, end] = computedEllipsisRange;

    return [...items.slice(0, start), ...items.slice(end)];
  }

  function getEllipsisRange() {
    /** when the item count is greater than 4, we will show ellipsis */
    const MIN_ITEM_COUNT_WITH_ELLIPSIS = 5;

    if (!ellipsis || items.length < MIN_ITEM_COUNT_WITH_ELLIPSIS) return null;

    if (ellipsis === true) {
      return [1, items.length - 2];
    }

    let [start, end] = ellipsis;

    if (start === 0) {
      start = 1;
    }

    if (end === items.length) {
      end = items.length - 1;
    }

    return [start, end];
  }

  return (
    <BreadcrumbRoot
      className={className || classNames?.root}
      size={size}
      {...rest}
      ref={ref}
    >
      <BreadcrumbList
        className={classNames?.list}
        size={size}
      >
        {itemsFilterEllipsis.map((item, index) => {
          const isEllipsis = startEllipsisIndex && startEllipsisIndex === index;

          const isShowSeparator = index < itemsFilterEllipsis.length - 1;

          return (
            <Fragment key={item.value}>
              {isEllipsis && (
                <>
                  <Ellipsis<T>
                    className={classNames?.ellipsis}
                    ellipsisIcon={ellipsisIcon}
                    items={ellipsisItems}
                    renderEllipsis={renderEllipsis}
                  />
                  {separator || <BreadcrumbSeparator className={classNames?.separator} />}
                </>
              )}

              <BreadcrumbItemContent
                className={classNames?.item}
                size={size}
                onClick={() => handleItemClick?.(item)}
              >
                {item.leading}

                {renderBreadcrumbContent(item, renderItem)}

                {item.trailing}
              </BreadcrumbItemContent>

              {isShowSeparator && (separator || <BreadcrumbSeparator className={classNames?.separator} />)}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

export default forwardRef(Breadcrumb);

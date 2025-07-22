import { Portal } from '@radix-ui/react-dropdown-menu';

import DropdownMenuArrow from './DropdownMenuArrow';
import DropdownMenuContent from './DropdownMenuContent';
import type { DropdownMenuPortalContentProps } from './types';

const DropdownMenuPortalContent = (props: DropdownMenuPortalContentProps) => {
  const { children, container, forceMountContent, forceMountPortal, showArrow, ...rest } = props;

  return (
    <Portal
      container={container}
      forceMount={forceMountPortal}
    >
      <DropdownMenuContent
        forceMount={forceMountContent}
        {...rest}
      >
        {children}

        {showArrow && <DropdownMenuArrow />}
      </DropdownMenuContent>
    </Portal>
  );
};

DropdownMenuPortalContent.displayName = 'DropdownMenuPortalContent';

export default DropdownMenuPortalContent;

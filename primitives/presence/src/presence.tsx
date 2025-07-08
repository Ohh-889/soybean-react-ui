import * as React from 'react';
import type { Ref } from 'react';
import { useComposedRefs } from 'soybean-react-ui/compose-refs';
import { getElementRef } from 'soybean-react-ui/slot';

import { usePresence } from './use-presence';

interface PresenceProps {
  children: React.ReactElement | ((props: { present: boolean }) => React.ReactElement);
  present: boolean;
}

const Presence: React.FC<PresenceProps> = props => {
  const { children, present } = props;

  const presence = usePresence(present);

  const child = (
    typeof children === 'function' ? children({ present: presence.isPresent }) : React.Children.only(children)
  ) as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>;

  const ref = useComposedRefs(presence.ref, getElementRef(child));

  const forceMount = typeof children === 'function';

  return forceMount || presence.isPresent ? React.cloneElement(child, { ref: ref as Ref<HTMLElement> }) : null;
};

Presence.displayName = 'Presence';

const Root = Presence;

export {
  Presence,
  //
  Root
};
export type { PresenceProps };

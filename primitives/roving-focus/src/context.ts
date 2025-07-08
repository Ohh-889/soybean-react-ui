import { createContextScope } from 'soybean-react-ui/context';
import { createCollection } from 'soybean-react-ui/collection';
import { ItemData, RovingContextValue } from './types';

export const GROUP_NAME = 'RovingFocusGroup';

export const [Collection, useCollection, createCollectionScope] = createCollection<HTMLSpanElement, ItemData>(GROUP_NAME);


export const [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(GROUP_NAME, [
  createCollectionScope
]);

export const [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext<RovingContextValue>(GROUP_NAME);


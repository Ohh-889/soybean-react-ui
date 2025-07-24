import type { ComponentPropsWithRef } from 'react';

import type { BaseNodeProps } from '@/types/other';

export type InputProps = BaseNodeProps<Omit<ComponentPropsWithRef<'input'>, 'size'>>;

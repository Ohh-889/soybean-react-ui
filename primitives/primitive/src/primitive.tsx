import * as React from 'react';
import { createSlot } from 'soybean-react-ui/slot';

export const NODES = [
  'a',
  'button',
  'div',
  'form',
  'h2',
  'h3',
  'img',
  'input',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'select',
  'span',
  'svg',
  'ul'
] as const;

type Primitives = { [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E> };

type PrimitivePropsWithRef<E extends React.ElementType> = React.ComponentPropsWithRef<E> & {
  asChild?: boolean;
};

type PrimitiveForwardRefComponent<E extends React.ElementType> = React.ForwardRefExoticComponent<
  PrimitivePropsWithRef<E>
>;

const Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = React.forwardRef((props: PrimitivePropsWithRef<typeof node>, forwardedRef: any) => {
    const { asChild, ...primitiveProps } = props;

    const Comp: any = asChild ? Slot : node;

    if (typeof window !== 'undefined') {
      (window as any)[Symbol.for('soybean-ui')] = true;
    }

    return (
      <Comp
        {...primitiveProps}
        ref={forwardedRef}
      />
    );
  });

  Node.displayName = `Primitive.${node}`;

  return { ...primitive, [node]: Node };
}, {} as Primitives);

const Root = Primitive;

export {
  Primitive,
  //
  Root
};
export type { PrimitivePropsWithRef };

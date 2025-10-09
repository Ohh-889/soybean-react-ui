'use client';
import * as React from 'react';

import { DemoFrame } from './DemoFrame';

function LiveDemo({
  code,
  defaultShowNumbers,
  defaultWrap,
  highlight,
  lang = 'tsx',
  title
}: {
  code: string;
  defaultShowNumbers?: boolean;
  defaultWrap?: boolean;
  highlight?: string;
  lang?: 'jsx' | 'tsx';
  title?: string;
}) {
  const [Comp, setComp] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = factory(React);
      const Cmp = (mod?.default || mod) as React.ComponentType;
      if (!cancelled) setComp(() => Cmp);
    })();
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <DemoFrame
      code={code}
      defaultShowNumbers={defaultShowNumbers}
      defaultWrap={defaultWrap}
      highlight={highlight}
      lang={lang}
      title={title}
    />
  );
}

export default LiveDemo;

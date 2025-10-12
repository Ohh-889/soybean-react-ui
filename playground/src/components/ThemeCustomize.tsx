'use client';

import { builtinColorMap, builtinRadiuses } from '@skyroc/tailwind-plugin';
import { useState } from 'react';
import type { ThemeSize } from 'skyroc-ui';
import { Button, Icon, Label, cn } from 'skyroc-ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const ThemeCustomize = () => {
  const [color, setColor] = useState('default');

  const [size, setSize] = useState('md');

  const [radius, setRadius] = useState(0.5);

  return (
    <div className="p-4">
      <div className="grid space-y-1">
        <h1 className="text-md text-foreground font-semibold">Customize</h1>
        <p className="text-xs text-muted-foreground">Pick a style and color for your components.</p>
      </div>

      <div className="pt-6 space-y-1.5">
        <Label
          className="text-xs"
          htmlFor="color"
        >
          Color
        </Label>

        <div className="grid grid-cols-3 gap-2 py-1.5">
          {Object.entries(builtinColorMap).map(([key, value]) => (
            <div
              className={key === 'default' ? 'col-span-3' : ''}
              key={key}
            >
              <Button
                className={cn('justify-start', key !== 'default' && 'w-full')}
                size="sm"
                variant={color === key ? 'outline' : 'pure'}
                onClick={() => setColor(key)}
              >
                <span
                  className="size-4 flex shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `hsl(${value})` }}
                >
                  {color === key && (
                    <Icon
                      className="size-3 text-white"
                      icon="lucide:check"
                    />
                  )}
                </span>
                <span className="ml-2 text-xs capitalize">{key}</span>
              </Button>
            </div>
          ))}
        </div>

        <div className="pt-6 space-y-1.5">
          <Label
            className="text-xs"
            htmlFor="radius"
          >
            Radius
          </Label>
          <div className="grid grid-cols-5 gap-2 py-1.5">
            {builtinRadiuses.map((r, index) => (
              <Button
                key={index}
                size="sm"
                variant={r === radius ? 'outline' : 'pure'}
                onClick={() => setRadius(r)}
              >
                <span className="text-xs">{r}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-6 space-y-1.5">
          <Label
            className="text-xs"
            htmlFor="size"
          >
            Size
          </Label>
          <div className="grid grid-cols-5 gap-2 py-1.5">
            {sizes.map((s, index) => (
              <Button
                key={index}
                size="sm"
                variant={s === size ? 'outline' : 'pure'}
                onClick={() => setSize(s)}
              >
                <span className="text-xs">{s}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomize;

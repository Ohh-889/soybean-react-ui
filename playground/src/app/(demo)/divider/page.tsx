import React from 'react';
import type { DividerBorder, ThemeAlign } from 'soybean-react-ui';
import { Card, Divider } from 'soybean-react-ui';

const aligns: ThemeAlign[] = ['start', 'center', 'end'];

const borders: DividerBorder[] = ['solid', 'dashed', 'dotted'];

function DividerDemo() {
  return (
    <div className="flex-c gap-4">
      <Card title="Horizontal">
        <Divider className="mb-6">Horizontal</Divider>
      </Card>

      <Card title="Vertical">
        <div className="flex-center h-5 space-x-4">
          <div>Soybean</div>
          <Divider orientation="vertical" />
          <div>UI</div>
          <Divider orientation="vertical" />
          <div>Vue</div>
        </div>
      </Card>

      <Card title="Align">
        {aligns.map(align => (
          <Divider
            align={align}
            className="mb-6"
            key={align}
          >
            {align}
          </Divider>
        ))}
      </Card>

      <Card title="Custom Align">
        <Divider
          className="mb-6"
          classNames={{ label: 'left-1/3' }}
        >
          Custom Align
        </Divider>
      </Card>

      <Card title="Border">
        {borders.map(border => (
          <Divider
            border={border}
            key={border}
          />
        ))}
      </Card>

      <Card title="Border Width">
        <Divider
          border="solid"
          className="mb-6 border-[2px]"
        >
          2 px
        </Divider>
      </Card>
    </div>
  );
}

export default DividerDemo;

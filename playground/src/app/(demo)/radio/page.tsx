import type { RadioGroupProps } from 'soybean-react-ui';

import RadioColor from './modules/RadioColor';
import RadioDisabledAll from './modules/RadioDisabledAll';
import RadioDisabledItem from './modules/RadioDisabledItem';
import RadioSize from './modules/RadioSize';
import RadioVertical from './modules/RadioVertical';

const items: RadioGroupProps['items'] = [
  { id: 'r1', label: 'A', value: '1' },
  { id: 'r2', label: 'B', value: '2' },
  { id: 'r3', label: 'C', value: '3' }
];

const RadioPage = () => {
  return (
    <div className="flex-c gap-4">
      <RadioColor items={items} />

      <RadioVertical items={items} />

      <RadioDisabledItem />

      <RadioDisabledAll items={items} />

      <RadioSize items={items} />
    </div>
  );
};

export default RadioPage;

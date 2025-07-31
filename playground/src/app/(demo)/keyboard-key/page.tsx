import KeyboardKeyDemo from './modules/KeyboardKeyDemo';
import KeyboardKeyGroup from './modules/KeyboardKeyGroup';
import KeyboardKeySize from './modules/KeyboardKeySize';
import KeyboardKeyVariants from './modules/KeyboardKeyVariants';

const KeyboardKeyPage = () => {
  return (
    <div className="flex-c gap-4">
      <KeyboardKeyDemo />
      <KeyboardKeyGroup />
      <KeyboardKeyVariants />
      <KeyboardKeySize />
    </div>
  );
};

export default KeyboardKeyPage;

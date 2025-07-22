import Checkbox from './modules/Checkbox';
import DefaultDropdownMenuDemo from './modules/DefaultDropdownMenuDemo';
import Radio from './modules/Radio';
import WithArrow from './modules/WithArrow';

const DropdownMenuPage = () => {
  return (
    <div className="flex-c gap-4">
      <DefaultDropdownMenuDemo />
      <WithArrow />
      <Checkbox />
      <Radio />
    </div>
  );
};

export default DropdownMenuPage;

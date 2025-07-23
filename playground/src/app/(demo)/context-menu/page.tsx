import Checkbox from './modules/Checkbox';
import ContextMenu from './modules/DefaultContextMenuDemo';
import Radio from './modules/Radio';
import WithArrow from './modules/WithArrow';

const DropdownMenuPage = () => {
  return (
    <div className="flex-c gap-4">
      <ContextMenu />
      <WithArrow />
      <Checkbox />
      <Radio />
    </div>
  );
};

export default DropdownMenuPage;

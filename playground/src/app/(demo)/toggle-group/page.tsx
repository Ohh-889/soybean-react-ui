import ToggleGroupMulti from './modules/ToggleGroupMulti';
import ToggleGroupSingle from './modules/ToggleGroupSingle';

const ToggleGroupPage = () => {
  return (
    <div className="flex-c gap-4">
      <ToggleGroupSingle />

      <ToggleGroupMulti />
    </div>
  );
};

export default ToggleGroupPage;

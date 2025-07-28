import ToggleDemo from './modules/ToggleDemo';
import ToggleDisabled from './modules/ToggleDisabled';
import ToggleSize from './modules/ToggleSize';

const TogglePage = () => {
  return (
    <div className="flex-c gap-4">
      <ToggleDemo />

      <ToggleSize />

      <ToggleDisabled />
    </div>
  );
};

export default TogglePage;

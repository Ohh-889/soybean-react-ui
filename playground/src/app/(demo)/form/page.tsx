import Default from './modules/Default';
import FieldChange from './modules/FieldChange';
import Preserve from './modules/Preserve';
import Reset from './modules/Reset';
import UseWatch from './modules/UseWatch';
import Validate from './modules/validate';
import ValidateWarning from './modules/validateWaring';

const FormPage = () => {
  return (
    <div className="flex-c gap-4">
      <Default />

      <FieldChange />

      <Validate />

      <ValidateWarning />

      <UseWatch />

      <Reset />

      <Preserve />
    </div>
  );
};

export default FormPage;

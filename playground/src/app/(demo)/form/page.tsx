import ClearDestroy from './modules/ClearDestroy';
import ComputedDemo from './modules/ComputedDemo';
import Default from './modules/Default';
import FieldChange from './modules/FieldChange';
import List from './modules/List';
import Middleware from './modules/Middleware';
import Preserve from './modules/Preserve';
import Reset from './modules/Reset';
import UndoRedo from './modules/UndoRedo';
import UseForm from './modules/UseForm';
import UseSelector from './modules/UseSelector';
import UseWatch from './modules/UseWatch';
import ZodResolver from './modules/ZodResolver';
import Validate from './modules/validate';
import ValidateWarning from './modules/validateWaring';

const FormPage = () => {
  return (
    <div className="flex-c gap-4">
      <Default />

      <List />

      <UseForm />

      <ComputedDemo />

      <FieldChange />

      <Validate />

      <ValidateWarning />

      <ZodResolver />

      <UseWatch />

      <UseSelector />

      <Reset />

      <Preserve />

      <Middleware />

      <UndoRedo />

      <ClearDestroy />
    </div>
  );
};

export default FormPage;

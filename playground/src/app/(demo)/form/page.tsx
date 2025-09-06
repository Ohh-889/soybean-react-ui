import Default from './modules/Default';
import FieldChange from './modules/FieldChange';
import Validate from './modules/validate';

const FormPage = () => {
  return (
    <div className="flex-c gap-4">
      <Default />

      <FieldChange />

      <Validate />
    </div>
  );
};

export default FormPage;

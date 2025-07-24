import InputDefaultDemo from './modules/InputDefaultDemo';
import InputDisabled from './modules/InputDisabled';
import InputFile from './modules/InputFIle';
import InputSize from './modules/InputSize';

const InputPage = () => {
  return (
    <div className="flex-c gap-4">
      <InputDefaultDemo />
      <InputDisabled />
      <InputFile />
      <InputSize />
    </div>
  );
};

export default InputPage;

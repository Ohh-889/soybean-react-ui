import CustomSeparator from './modules/CustomSeparator';
import Disabled from './modules/Disabled';
import InputOtpCustomCount from './modules/InputOtpCustomCount';
import InputOtpDefault from './modules/InputOtpDefault';
import Password from './modules/Password';
import Separator from './modules/Separator';
import UpperCase from './modules/UpperCase';

const InputOtpPage = () => {
  return (
    <div className="demo-pin-input flex-c gap-4">
      <InputOtpDefault />
      <InputOtpCustomCount />
      <UpperCase />
      <Separator />
      <CustomSeparator />
      <Password />
      <Disabled />
    </div>
  );
};

export default InputOtpPage;

import CustomSize from './modules/CustomSize';
import DefaultDemo from './modules/DefaultDemo';

const SkeletonPage = () => {
  return (
    <div className="flex-c gap-4">
      <DefaultDemo />
      <CustomSize />
    </div>
  );
};

export default SkeletonPage;

import SliderColor from './modules/SliderColor';
import SliderSize from './modules/SliderSize';
import SliderVertical from './modules/SliderVertical';

const SliderPage = () => {
  return (
    <div className="flex-c gap-4">
      <SliderColor />

      <SliderVertical />

      <SliderSize />
    </div>
  );
};

export default SliderPage;

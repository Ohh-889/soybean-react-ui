import HoverCardDefaultDemo from './modules/HoverCardDefaultDemo';
import HoverCardWithArrow from './modules/HoverCardWithArrow';

const HoverCardPage = () => {
  return (
    <div className="flex-c gap-4">
      <HoverCardDefaultDemo />
      <HoverCardWithArrow />
    </div>
  );
};

export default HoverCardPage;

import TextCustomCount from './modules/TextCustomCount';
import TextareaCountGraphemes from './modules/TextareaCountGraphemes';
import TextareaDemo from './modules/TextareaDemo';
import TextareaMaxlength from './modules/TextareaMaxlength';
import TextareaSize from './modules/TextareaSize';

const TextareaPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <TextareaDemo />

      <TextareaCountGraphemes />

      <TextCustomCount />

      <TextareaMaxlength />

      <TextareaSize />
    </div>
  );
};

export default TextareaPage;

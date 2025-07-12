'use client';
import { Button, toast, useSonner } from 'soybean-react-ui';

const SonnerPage = () => {
  const a = useSonner();

  return (
    <div>
      <button
        onClick={() =>
          toast('Hello', {
            duration: 100000
          })
        }
      >
        Click me
      </button>

      <button
        onClick={() =>
          toast.success('Hello', {
            description: 'This is a description',
            duration: 100000
          })
        }
      >
        Click me
      </button>

      <button
        onClick={() =>
          toast.success('Hello', {
            action: {
              label: 'Click me',
              onClick: () => {
                toast.success('Hello');
              }
            },

            description: 'This is a description',
            duration: 3000
          })
        }
      >
        Click me
      </button>
    </div>
  );
};

export default SonnerPage;

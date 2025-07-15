import Image from 'next/image';
import type { ThemeSize } from 'soybean-react-ui';
import { Avatar, Card } from 'soybean-react-ui';

const soybeanUiRsc = 'https://soybean-ui.com/logo.svg';

const soybeanSrc = 'https://soybeanjs-1300612522.cos.ap-guangzhou.myqcloud.com/uPic/logo.png';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const AvatarPage = () => {
  return (
    <div className="flex gap-4 flex-col">
      <Card
        split
        title="Default"
      >
        <div className="flex gap-[12px]">
          <Avatar
            alt="Soybean UI"
            fallback="CN"
            src={soybeanUiRsc}
          />

          <Avatar
            alt="Soybean UI"
            classNames={{ fallback: 'bg-foreground ' }}
            src={soybeanUiRsc}
            fallback={
              <Image
                alt="Vercel logomark"
                className="dark:invert"
                height={20}
                src="/vercel.svg"
                width={20}
              />
            }
          />
        </div>
      </Card>

      <Card
        split
        title="Sizes"
      >
        <div className="flex gap-[12px] flex-wrap">
          {sizes.map(size => (
            <div
              className="flex-c-center"
              key={size}
            >
              <Avatar
                alt="Soybean UI"
                fallback="SOY"
                size={size}
                src={soybeanSrc}
              />
              <p>{size}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AvatarPage;

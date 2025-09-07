import { toast } from 'soybean-react-ui';

export function showToastCode(title: string, values: any) {
  toast(title, {
    className: '!w-[400px]',
    description: (
      <pre className="mt-2 w-[360px] max-sm:w-screen rounded-md bg-neutral-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
    ),
    position: 'top-center'
  });
}

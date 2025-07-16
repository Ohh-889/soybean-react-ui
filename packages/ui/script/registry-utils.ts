import { type Registry } from 'shadcn/registry';

export const registryUtils: Registry['items'][number] = {
  dependencies: ['clsx', 'tailwind-merge'],
  files: [
    {
      path: 'src/lib/utils.ts',
      type: 'registry:lib'
    },
    {
      path: 'src/lib/typed.ts',
      type: 'registry:lib'
    }
  ],
  name: 'utils',
  title: 'Utils',
  type: 'registry:lib'
};

export const SELF_REGISTRY_DEPENDENCIES =
  process.argv[2] === 'dev' ? 'http://localhost:3001/r' : 'https://ui-play.skyroc.me/r';

export const getSelfRegistryDependencies = (name: string) => {
  return `${SELF_REGISTRY_DEPENDENCIES}/${name}.json`;
};

export const registryComponentsDependencies: Record<
  string,
  { dependencies: string[]; registryDependencies?: string[] }
> = {
  accordion: {
    dependencies: ['@radix-ui/react-accordion', '@radix-ui/react-slot']
  },
  alert: {
    dependencies: ['@radix-ui/react-slot']
  },
  'alert-dialog': {
    dependencies: ['@radix-ui/react-alert-dialog', '@radix-ui/react-slot'],
    registryDependencies: [getSelfRegistryDependencies('button')]
  },
  'aspect-ratio': {
    dependencies: ['@radix-ui/react-aspect-ratio']
  },
  avatar: {
    dependencies: ['@radix-ui/react-avatar']
  },
  breadcrumb: {
    dependencies: ['@radix-ui/react-slot']
  },
  button: {
    dependencies: ['@radix-ui/react-slot'],
    registryDependencies: [getSelfRegistryDependencies('icon')]
  },
  carousel: {
    dependencies: ['embla-carousel-react'],
    registryDependencies: [getSelfRegistryDependencies('button')]
  },
  checkbox: {
    dependencies: ['@radix-ui/react-checkbox']
  },
  divider: {
    dependencies: ['@radix-ui/react-separator']
  },
  label: {
    dependencies: ['@radix-ui/react-label']
  },
  'scroll-area': {
    dependencies: ['@radix-ui/react-scroll-area']
  },
  sonner: {
    dependencies: ['sonner', 'next-themes']
  },
  tabs: {
    dependencies: ['@radix-ui/react-tabs', '@radix-ui/react-compose-refs']
  }
} as const;

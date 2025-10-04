export type ComponentsJson = {
  $schema?: string;
  aliases?: {
    components?: string;
    hooks?: string;
    lib?: string;
    ui?: string;
    utils?: string;
  };
  iconLibrary?: string;
  registries?: Record<
    string,
    | string
    | {
        headers?: Record<string, string>;
        params?: Record<string, string>;
        url: string;
      }
  >;
  rsc?: boolean;
  style?: string;
  tailwind?: {
    baseColor?: string;
    config?: string;
    css?: string;
    cssVariables?: boolean;
    prefix?: string;
  };
  tsx?: boolean;
};

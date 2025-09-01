/* eslint-disable @typescript-eslint/prefer-literal-enum-member */
/* eslint-disable no-bitwise */

export enum ChangeTag {
  Value = 0b000001,
  Validating = 0b000010,
  Errors = 0b000100,
  Warnings = 0b001000,
  Touched = 0b010000,
  Dirty = 0b100000,
  Validated = 0b1000000,
  Reset = 0b10000000,
  Status = Errors | Warnings | Validated | Validating,
  All = 0x7fffffff
}

export type ChangeMask = number;

export const hasTag = (mask: ChangeMask, tag: ChangeTag) => (mask & tag) !== 0;
export const addTag = (mask: ChangeMask, ...tags: ChangeTag[]) => tags.reduce((m, t) => m | t, mask);
export const delTag = (mask: ChangeMask, ...tags: ChangeTag[]) => tags.reduce((m, t) => m & ~t, mask);

export interface SubscribeMaskOptions {
  all?: boolean;
  dirty?: boolean;
  errors?: boolean;
  reset?: boolean;
  touched?: boolean;
  validated?: boolean;
  validating?: boolean;
  value?: boolean;
  warnings?: boolean;
}

export const toMask = (opt: SubscribeMaskOptions = {}): ChangeMask => {
  if (opt.all) return ChangeTag.All;

  const tags: ChangeTag[] = [];
  if (opt.value) tags.push(ChangeTag.Value);
  if (opt.errors) tags.push(ChangeTag.Errors);
  if (opt.warnings) tags.push(ChangeTag.Warnings);
  if (opt.validating) tags.push(ChangeTag.Validating);
  if (opt.validated) tags.push(ChangeTag.Validated);
  if (opt.touched) tags.push(ChangeTag.Touched);
  if (opt.dirty) tags.push(ChangeTag.Dirty);
  if (opt.reset) tags.push(ChangeTag.Reset);

  return addTag(0, ...tags);
};

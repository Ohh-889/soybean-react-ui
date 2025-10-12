import { generateChangelog, generateTotalChangelog } from '@soybeanjs/changelog';
import type { ChangelogOption } from '@soybeanjs/changelog';

export async function genChangelog(options?: Partial<ChangelogOption>, total = false, tag?: string) {
  if (total) {
    await generateTotalChangelog(Object.assign(options ?? {}, { to: tag }));
  } else {
    await generateChangelog(Object.assign(options ?? {}, { to: tag }));
  }
}

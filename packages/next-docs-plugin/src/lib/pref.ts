export type Prefs = {
  numbers: boolean;
  tab: 'code' | 'preview';
  wrap: boolean;
};

const KEY = '__demo_prefs__';

export function loadPrefs(): Prefs {
  try {
    const s = localStorage.getItem(KEY);
    if (s) return JSON.parse(s);
  } catch {}
  return { numbers: true, tab: 'preview', wrap: false };
}

export function savePrefs(p: Prefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
}

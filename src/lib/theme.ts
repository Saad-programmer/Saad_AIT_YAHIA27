export type Theme = 'dark' | 'light';

export function getSavedTheme(value: string | null): Theme {
  return value === 'light' ? 'light' : 'dark';
}

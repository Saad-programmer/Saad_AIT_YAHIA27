import { describe, expect, it } from 'vitest';
import { getSavedTheme } from './theme';

describe('getSavedTheme', () => {
  it('defaults to dark when no preference is saved', () => {
    expect(getSavedTheme(null)).toBe('dark');
  });

  it('restores the explicit light preference', () => {
    expect(getSavedTheme('light')).toBe('light');
  });

  it('falls back to dark for invalid stored values', () => {
    expect(getSavedTheme('system')).toBe('dark');
  });
});

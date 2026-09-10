import { describe, it, expect } from 'vitest';

describe('Sanity Environment Check', () => {
  it('verifies vitest test runner and dom assertions operate properly', () => {
    const el = document.createElement('div');
    el.innerHTML = '<span data-testid="bauhaus">Bauhaus</span>';
    expect(el.querySelector('[data-testid="bauhaus"]')?.textContent).toBe('Bauhaus');
  });
});

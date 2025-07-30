import { describe, it, expect } from 'vitest';

describe('Test Setup', () => {
  it('has access to jest-dom matchers', () => {
    const element = document.createElement('div');
    element.textContent = 'Hello World';
    document.body.appendChild(element);

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World');

    document.body.removeChild(element);
  });

  it('has global mocks available', () => {
    expect(global.IntersectionObserver).toBeDefined();
    expect(global.ResizeObserver).toBeDefined();
    expect(window.matchMedia).toBeDefined();
  });

  it('matchMedia returns expected structure', () => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    expect(mediaQuery).toHaveProperty('matches');
    expect(mediaQuery).toHaveProperty('media');
    expect(mediaQuery).toHaveProperty('addListener');
    expect(mediaQuery).toHaveProperty('removeListener');
  });
});

/// <reference types="vitest" />
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock fetch globally
const mockFetch = vi.fn();
Object.defineProperty(globalThis, 'fetch', {
  value: mockFetch,
  writable: true,
});

// Mock navigator.clipboard
Object.defineProperty(globalThis.navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
  },
  writable: true,
});

// Mock IntersectionObserver with proper interface
const MockIntersectionObserver = vi.fn(() => ({
  root: null,
  rootMargin: '0px',
  thresholds: [0],
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(() => []),
}));

Object.defineProperty(globalThis, 'IntersectionObserver', {
  value: MockIntersectionObserver,
  writable: true,
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

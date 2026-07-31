import { renderHook, act } from '@testing-library/react';
import { useUrlFilters } from './useUrlFilters';

describe('useUrlFilters', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('reads initial state from URL', () => {
    window.history.replaceState(null, '', '/?python=3.12&cuda=12.4');
    const { result } = renderHook(() => useUrlFilters());

    expect(result.current.filters.python).toBe('3.12');
    expect(result.current.filters.cuda).toBe('12.4');
    expect(result.current.filters.torch).toBeNull();
  });

  it('returns null for missing params', () => {
    window.history.replaceState(null, '', '/');
    const { result } = renderHook(() => useUrlFilters());

    expect(result.current.filters.python).toBeNull();
    expect(result.current.filters.query).toBe('');
  });

  it('updates URL when filters change', () => {
    const { result } = renderHook(() => useUrlFilters());

    act(() => {
      result.current.updateFilters({ python: '3.11', torch: '2.6' });
    });

    expect(result.current.filters.python).toBe('3.11');
    expect(result.current.filters.torch).toBe('2.6');
    expect(window.location.search).toContain('python=3.11');
    expect(window.location.search).toContain('torch=2.6');
  });

  it('removes param from URL when set to null', () => {
    window.history.replaceState(null, '', '/?python=3.12');
    const { result } = renderHook(() => useUrlFilters());

    act(() => {
      result.current.updateFilters({ python: null });
    });

    expect(window.location.search).not.toContain('python');
  });

  it('reads query param as q', () => {
    window.history.replaceState(null, '', '/?q=flash');
    const { result } = renderHook(() => useUrlFilters());

    expect(result.current.filters.query).toBe('flash');
  });

  it('reads ABI params from URL', () => {
    window.history.replaceState(null, '', '/?abi_python=1&abi_torch=1');
    const { result } = renderHook(() => useUrlFilters());

    expect(result.current.filters.abiPython).toBe(true);
    expect(result.current.filters.abiTorch).toBe(true);
    expect(result.current.filters.abiCuda).toBe(false);
  });

  it('writes ABI params to URL', () => {
    const { result } = renderHook(() => useUrlFilters());

    act(() => {
      result.current.updateFilters({ abiPython: true });
    });

    expect(window.location.search).toContain('abi_python=1');
  });

  it('omits ABI params from URL when false', () => {
    const { result } = renderHook(() => useUrlFilters());

    act(() => {
      result.current.updateFilters({ abiPython: false, abiTorch: false, abiCuda: false });
    });

    expect(window.location.search).not.toContain('abi_python');
    expect(window.location.search).not.toContain('abi_torch');
    expect(window.location.search).not.toContain('abi_cuda');
  });

  it('defaults ABI flags to false when not in URL', () => {
    window.history.replaceState(null, '', '/');
    const { result } = renderHook(() => useUrlFilters());

    expect(result.current.filters.abiPython).toBe(false);
    expect(result.current.filters.abiTorch).toBe(false);
    expect(result.current.filters.abiCuda).toBe(false);
  });
});

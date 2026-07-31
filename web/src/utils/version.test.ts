import type { Wheel } from '@/types';
import {
  parseVersion,
  compareVersions,
  getVersionString,
  sortWheelsByLatest,
  getLatestVersion,
} from './version';

describe('parseVersion', () => {
  it('parses simple version', () => {
    expect(parseVersion('2.7.4')).toEqual({
      major: 2,
      minor: 7,
      patch: 4,
      suffix: '',
      suffixNum: 0,
    });
  });

  it('strips v prefix', () => {
    expect(parseVersion('v2.7.4')).toEqual({
      major: 2,
      minor: 7,
      patch: 4,
      suffix: '',
      suffixNum: 0,
    });
  });

  it('strips > prefix', () => {
    expect(parseVersion('>3.9')).toEqual({
      major: 3,
      minor: 9,
      patch: 0,
      suffix: '',
      suffixNum: 0,
    });
  });

  it('parses post-release suffix', () => {
    expect(parseVersion('2.7.4.post4')).toEqual({
      major: 2,
      minor: 7,
      patch: 4,
      suffix: 'post',
      suffixNum: 4,
    });
  });

  it('parses rc suffix', () => {
    expect(parseVersion('2.7.4.rc1')).toEqual({
      major: 2,
      minor: 7,
      patch: 4,
      suffix: 'rc',
      suffixNum: 1,
    });
  });

  it('parses beta suffix', () => {
    expect(parseVersion('2.7.4.beta2')).toEqual({
      major: 2,
      minor: 7,
      patch: 4,
      suffix: 'beta',
      suffixNum: 2,
    });
  });

  it('parses alpha suffix', () => {
    expect(parseVersion('2.7.4.alpha1')).toEqual({
      major: 2,
      minor: 7,
      patch: 4,
      suffix: 'alpha',
      suffixNum: 1,
    });
  });

  it('handles two-part version', () => {
    expect(parseVersion('3.10')).toEqual({
      major: 3,
      minor: 10,
      patch: 0,
      suffix: '',
      suffixNum: 0,
    });
  });

  it('handles single-part version', () => {
    expect(parseVersion('3')).toEqual({
      major: 3,
      minor: 0,
      patch: 0,
      suffix: '',
      suffixNum: 0,
    });
  });

  it('handles empty string', () => {
    expect(parseVersion('')).toEqual({
      major: 0,
      minor: 0,
      patch: 0,
      suffix: '',
      suffixNum: 0,
    });
  });

  it('handles multi-digit segments', () => {
    expect(parseVersion('2.10.12')).toEqual({
      major: 2,
      minor: 10,
      patch: 12,
      suffix: '',
      suffixNum: 0,
    });
  });
});

describe('compareVersions', () => {
  it('higher major version sorts first (returns negative)', () => {
    expect(compareVersions('3.0.0', '2.0.0')).toBeLessThan(0);
  });

  it('lower major version sorts second (returns positive)', () => {
    expect(compareVersions('2.0.0', '3.0.0')).toBeGreaterThan(0);
  });

  it('higher minor version sorts first', () => {
    expect(compareVersions('2.10.0', '2.9.0')).toBeLessThan(0);
  });

  it('higher patch version sorts first', () => {
    expect(compareVersions('2.7.5', '2.7.4')).toBeLessThan(0);
  });

  it('equal versions return 0', () => {
    expect(compareVersions('2.7.4', '2.7.4')).toBe(0);
  });

  it('post-release sorts higher than release', () => {
    expect(compareVersions('2.7.4.post1', '2.7.4')).toBeLessThan(0);
  });

  it('higher post number sorts first', () => {
    expect(compareVersions('2.7.4.post4', '2.7.4.post3')).toBeLessThan(0);
  });

  it('release sorts higher than rc', () => {
    expect(compareVersions('2.7.4', '2.7.4.rc1')).toBeLessThan(0);
  });

  it('rc sorts higher than beta', () => {
    expect(compareVersions('2.7.4.rc1', '2.7.4.beta1')).toBeLessThan(0);
  });

  it('beta sorts higher than alpha', () => {
    expect(compareVersions('2.7.4.beta1', '2.7.4.alpha1')).toBeLessThan(0);
  });

  it('handles v prefix', () => {
    expect(compareVersions('v2.7.4', '2.7.4')).toBe(0);
  });

  it('handles > prefix', () => {
    expect(compareVersions('>3.9', '3.9')).toBe(0);
  });
});

describe('getVersionString', () => {
  it('returns normalized string for string version', () => {
    expect(getVersionString('3.10.0')).toBe('3.10');
  });

  it('returns exact string version normalized', () => {
    expect(getVersionString('2.6.0')).toBe('2.6');
  });

  it('returns min for array range', () => {
    expect(getVersionString(['3.9', '3.12'])).toBe('3.9');
  });

  it('returns min for min-only range', () => {
    expect(getVersionString(['3.9', null])).toBe('3.9');
  });

  it('returns max for max-only range', () => {
    expect(getVersionString([null, '3.12'])).toBe('3.12');
  });

  it('returns 0 for null/null range', () => {
    expect(getVersionString([null, null])).toBe('0');
  });

  it('returns 0 for null input', () => {
    expect(getVersionString(null)).toBe('0');
  });

  it('returns 0 for undefined input', () => {
    expect(getVersionString(undefined)).toBe('0');
  });
});

describe('sortWheelsByLatest', () => {
  const makeWheel = (overrides: Partial<Wheel>): Wheel => ({
    package_version: '1.0.0',
    python_version: '3.10',
    torch_version: '2.6.0',
    cuda_version: '12.4',
    cxx11_abi: false,
    url: 'https://example.com/test.whl',
    ...overrides,
  });

  it('sorts by package_version descending first', () => {
    const wheels = [makeWheel({ package_version: '1.0.0' }), makeWheel({ package_version: '2.0.0' })];
    const sorted = sortWheelsByLatest(wheels);
    expect(sorted[0].package_version).toBe('2.0.0');
  });

  it('breaks ties with python_version descending', () => {
    const wheels = [makeWheel({ python_version: '3.10' }), makeWheel({ python_version: '3.12' })];
    const sorted = sortWheelsByLatest(wheels);
    expect(sorted[0].python_version).toBe('3.12');
  });

  it('breaks ties with torch_version descending', () => {
    const wheels = [makeWheel({ torch_version: '2.5.0' }), makeWheel({ torch_version: '2.6.0' })];
    const sorted = sortWheelsByLatest(wheels);
    expect(sorted[0].torch_version).toBe('2.6.0');
  });

  it('breaks ties with cuda_version descending', () => {
    const wheels = [makeWheel({ cuda_version: '12.1' }), makeWheel({ cuda_version: '12.4' })];
    const sorted = sortWheelsByLatest(wheels);
    expect(sorted[0].cuda_version).toBe('12.4');
  });

  it('does not mutate original array', () => {
    const wheels = [
      makeWheel({ package_version: '1.0.0' }),
      makeWheel({ package_version: '2.0.0' }),
    ];
    sortWheelsByLatest(wheels);
    expect(wheels[0].package_version).toBe('1.0.0');
  });

  it('handles empty array', () => {
    expect(sortWheelsByLatest([])).toEqual([]);
  });

  it('handles single element', () => {
    const wheels = [makeWheel({ package_version: '1.0.0' })];
    expect(sortWheelsByLatest(wheels)).toHaveLength(1);
  });

  it('handles VersionRange arrays in python_version', () => {
    const wheels = [
      makeWheel({ python_version: ['3.9', null] }),
      makeWheel({ python_version: ['3.12', null] }),
    ];
    const sorted = sortWheelsByLatest(wheels);
    expect(sorted[0].python_version).toEqual(['3.12', null]);
  });
});

describe('getLatestVersion', () => {
  const makeWheel = (v: string): Wheel => ({
    package_version: v,
    python_version: '3.10',
    torch_version: '2.6.0',
    cuda_version: '12.4',
    cxx11_abi: false,
    url: 'https://example.com/test.whl',
  });

  it('returns highest version', () => {
    expect(getLatestVersion([makeWheel('1.0.0'), makeWheel('2.7.4'), makeWheel('1.5.0')])).toBe(
      '2.7.4',
    );
  });

  it('returns empty string for empty array', () => {
    expect(getLatestVersion([])).toBe('');
  });

  it('handles post-release versions', () => {
    expect(getLatestVersion([makeWheel('2.7.4'), makeWheel('2.7.4.post4')])).toBe('2.7.4.post4');
  });

  it('handles single wheel', () => {
    expect(getLatestVersion([makeWheel('1.2.3')])).toBe('1.2.3');
  });

  it('handles v-prefixed versions', () => {
    expect(getLatestVersion([makeWheel('v1.0.0'), makeWheel('v2.0.0')])).toBe('v2.0.0');
  });
});

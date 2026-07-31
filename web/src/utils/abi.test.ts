import { isAbiVersion, versionMatchesAbiFilter } from './abi';

describe('isAbiVersion', () => {
  it('returns false for exact string version', () => {
    expect(isAbiVersion('3.10')).toBe(false);
  });

  it('returns false for exact range [min, min]', () => {
    expect(isAbiVersion(['3.10', '3.10'])).toBe(false);
  });

  it('returns false for bounded range [min, max]', () => {
    expect(isAbiVersion(['3.9', '3.12'])).toBe(false);
  });

  it('returns false for any range [null, null]', () => {
    expect(isAbiVersion([null, null])).toBe(false);
  });

  it('returns true for open-ended range [min, null]', () => {
    expect(isAbiVersion(['3.9', null])).toBe(true);
  });

  it('returns true for open-ended range with full version', () => {
    expect(isAbiVersion(['2.10.0', null])).toBe(true);
  });

  it('returns false for null', () => {
    expect(isAbiVersion(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isAbiVersion(undefined)).toBe(false);
  });

  it('returns false for max-only range [null, max]', () => {
    expect(isAbiVersion([null, '3.12'])).toBe(false);
  });
});

describe('versionMatchesAbiFilter', () => {
  it('matches when filter version >= min', () => {
    expect(versionMatchesAbiFilter(['3.9', null], '3.12')).toBe(true);
  });

  it('matches when filter version == min', () => {
    expect(versionMatchesAbiFilter(['3.9', null], '3.9')).toBe(true);
  });

  it('does not match when filter version < min', () => {
    expect(versionMatchesAbiFilter(['3.9', null], '3.8')).toBe(false);
  });

  it('matches with null filter (Any + ABI = show all ABI wheels)', () => {
    expect(versionMatchesAbiFilter(['2.10', null], null)).toBe(true);
  });

  it('does not match non-ABI exact range with null filter', () => {
    expect(versionMatchesAbiFilter(['3.10', '3.10'], null)).toBe(false);
  });

  it('does not match exact string version', () => {
    expect(versionMatchesAbiFilter('3.10', '3.10')).toBe(false);
  });

  it('handles normalized versions (2.10.0 -> 2.10)', () => {
    expect(versionMatchesAbiFilter(['2.10.0', null], '2.10')).toBe(true);
  });

  it('handles torch-style ABI range', () => {
    expect(versionMatchesAbiFilter(['2.10', null], '2.11')).toBe(true);
  });

  it('rejects torch version below ABI minimum', () => {
    expect(versionMatchesAbiFilter(['2.10', null], '2.9')).toBe(false);
  });

  it('handles cuda-style ABI range', () => {
    expect(versionMatchesAbiFilter(['12.0', null], '13.0')).toBe(true);
  });

  it('does not match bounded range even if filter is within bounds', () => {
    expect(versionMatchesAbiFilter(['3.9', '3.12'], '3.10')).toBe(false);
  });

  it('does not match null wheel version', () => {
    expect(versionMatchesAbiFilter(null, '3.10')).toBe(false);
  });

  it('does not match undefined wheel version', () => {
    expect(versionMatchesAbiFilter(undefined, '3.10')).toBe(false);
  });
});

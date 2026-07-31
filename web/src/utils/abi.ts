import type { VersionRange } from '@/types';
import { normalizeVersion, compareVersionStrings } from './index';

/**
 * Check if a VersionRange represents an ABI-style declaration.
 * ABI-style = [min, null] where min is not null.
 * This means "version X and higher" (open-ended minimum version),
 * which is the hallmark of ABI3/minimum-version compatibility.
 *
 * NOT ABI-style:
 * - "3.10" (exact string)
 * - ["3.10", "3.10"] (exact range, min === max)
 * - ["3.9", "3.12"] (bounded range)
 * - [null, null] (any version)
 */
export function isAbiVersion(version: VersionRange | null | undefined): boolean {
  if (!version || typeof version === 'string') return false;
  if (!Array.isArray(version)) return false;
  const [min, max] = version;
  return min !== null && max === null;
}

/**
 * Check if a wheel version matches in ABI mode.
 *
 * - If version is ABI-style [min, null]: check filterVersion >= min
 * - If filterVersion is null: just check isAbiVersion (show all ABI wheels)
 * - Non-ABI versions never match in ABI mode
 *
 * @param wheelVersion - The version range from the wheel data
 * @param filterVersion - The user-selected version filter (null = Any)
 * @returns true if the wheel matches the ABI filter criteria
 */
export function versionMatchesAbiFilter(
  wheelVersion: VersionRange | null | undefined,
  filterVersion: string | null,
): boolean {
  if (!isAbiVersion(wheelVersion)) return false;

  // ABI mode + Any version = show all ABI wheels
  if (filterVersion === null) return true;

  const [min] = wheelVersion as [string, null];
  const normalizedMin = normalizeVersion(min);
  const normalizedFilter = normalizeVersion(filterVersion);

  return compareVersionStrings(normalizedFilter, normalizedMin) >= 0;
}

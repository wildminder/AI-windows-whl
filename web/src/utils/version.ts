import type { Wheel, VersionRange } from '@/types';
import { normalizeVersion } from './index';

export interface ParsedVersion {
  major: number;
  minor: number;
  patch: number;
  suffix: string;
  suffixNum: number;
}

/**
 * Parse a version string into comparable components.
 * Handles: "2.7.4", "v2.7.4", ">3.9", "2.7.4.post4", "2.7.4.rc1"
 */
export function parseVersion(version: string): ParsedVersion {
  // Remove 'v' prefix and '>' prefix (for range versions like ">3.9")
  const cleanVersion = version.replace(/^v/, '').replace(/^>/, '');
  const parts = cleanVersion.split('.');

  const major = parseInt(parts[0]) || 0;
  const minor = parseInt(parts[1]) || 0;
  let patch = parseInt(parts[2]) || 0;
  let suffix = '';
  let suffixNum = 0;

  for (let i = 3; i < parts.length; i++) {
    const part = parts[i].toLowerCase();
    if (part.includes('post')) {
      suffix = 'post';
      suffixNum = parseInt(part.replace(/\D/g, '')) || 0;
    } else if (part.includes('rc')) {
      suffix = 'rc';
      suffixNum = parseInt(part.replace(/\D/g, '')) || 0;
    } else if (part.includes('beta') || part.includes('b')) {
      suffix = 'beta';
      suffixNum = parseInt(part.replace(/\D/g, '')) || 0;
    } else if (part.includes('alpha') || part.includes('a')) {
      suffix = 'alpha';
      suffixNum = parseInt(part.replace(/\D/g, '')) || 0;
    } else if (!isNaN(parseInt(part))) {
      patch = patch * 1000 + parseInt(part);
    }
  }

  return { major, minor, patch, suffix, suffixNum };
}

/**
 * Compare two version strings (descending order).
 * Returns: negative if a > b, positive if a < b, 0 if equal.
 * Suffix priority: post > release > rc > beta > alpha
 */
export function compareVersions(a: string, b: string): number {
  const va = parseVersion(a);
  const vb = parseVersion(b);

  if (va.major !== vb.major) return vb.major - va.major;
  if (va.minor !== vb.minor) return vb.minor - va.minor;
  if (va.patch !== vb.patch) return vb.patch - va.patch;

  const suffixPriority: Record<string, number> = { post: 5, '': 4, rc: 3, beta: 2, alpha: 1 };
  const pa = suffixPriority[va.suffix] || 0;
  const pb = suffixPriority[vb.suffix] || 0;

  if (pa !== pb) return pb - pa;

  if (va.suffix === 'post') {
    return vb.suffixNum - va.suffixNum;
  } else {
    return va.suffixNum - vb.suffixNum;
  }
}

/**
 * Extract a string version from VersionRange for sorting purposes.
 * For ranges, uses the minimum version.
 */
export function getVersionString(version: VersionRange | null | undefined): string {
  if (!version) return '0';

  if (typeof version === 'string') {
    return normalizeVersion(version);
  }

  if (!Array.isArray(version)) return '0';

  const [min, max] = version;
  if (min !== null && min !== undefined) return normalizeVersion(min);
  if (max !== null && max !== undefined) return normalizeVersion(max);
  return '0';
}

/**
 * Sort wheels by latest: package_version → python → torch → cuda (all descending).
 */
export function sortWheelsByLatest(wheels: Wheel[]): Wheel[] {
  return [...wheels].sort((a, b) => {
    const packageCompare = compareVersions(
      a.package_version || '0.0.0',
      b.package_version || '0.0.0',
    );
    if (packageCompare !== 0) return packageCompare;

    const pythonCompare = compareVersions(
      getVersionString(a.python_version),
      getVersionString(b.python_version),
    );
    if (pythonCompare !== 0) return pythonCompare;

    const torchCompare = compareVersions(
      getVersionString(a.torch_version),
      getVersionString(b.torch_version),
    );
    if (torchCompare !== 0) return torchCompare;

    return compareVersions(getVersionString(a.cuda_version), getVersionString(b.cuda_version));
  });
}

/**
 * Get the latest package version string from a list of wheels.
 */
export function getLatestVersion(wheels: Wheel[]): string {
  if (wheels.length === 0) return '';
  const sorted = [...wheels].sort((a, b) =>
    compareVersions(a.package_version || '0.0.0', b.package_version || '0.0.0'),
  );
  return sorted[0]?.package_version || '';
}

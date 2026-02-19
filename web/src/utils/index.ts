import type { Package, Wheel, WheelsData, FilterOptions, VersionRange } from '@/types';

const GITHUB_WHEELS_URL =
  'https://raw.githubusercontent.com/wildminder/AI-windows-whl/main/wheels.json';
const LOCAL_WHEELS_PATH = './wheels.json';

export async function loadWheelsData(): Promise<WheelsData> {
  // First, try to load from local/root folder
  try {
    const localResponse = await fetch(LOCAL_WHEELS_PATH, {
      method: 'GET',
      cache: 'no-cache', // Always check for updates
    });

    if (localResponse.ok) {
      console.log('[Wheels] Loading from local file');
      const data = await localResponse.json();
      return data;
    }
  } catch (error) {
    console.log('[Wheels] Local file not found or error:', error);
  }

  // Fallback: fetch from GitHub main branch
  console.log('[Wheels] Fetching from GitHub...');
  const response = await fetch(GITHUB_WHEELS_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch wheels data: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function filterWheels(packages: Package[], options: FilterOptions): Package[] {
  const { searchQuery, pythonVersion, torchVersion, cudaVersion, packageId } = options;

  return packages
    .map((pkg) => {
      let filteredWheels = [...pkg.wheels];

      if (pythonVersion) {
        filteredWheels = filteredWheels.filter((w) =>
          versionMatchesFilter(w.python_version, pythonVersion),
        );
      }

      if (torchVersion) {
        filteredWheels = filteredWheels.filter((w) =>
          versionMatchesFilter(w.torch_version, torchVersion),
        );
      }

      if (cudaVersion) {
        filteredWheels = filteredWheels.filter((w) =>
          versionMatchesFilter(w.cuda_version, cudaVersion),
        );
      }

      return { ...pkg, wheels: filteredWheels };
    })
    .filter((pkg) => {
      if (packageId && pkg.id !== packageId) {
        return false;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = pkg.name?.toLowerCase().includes(query);
        const matchesDesc = pkg.description?.toLowerCase().includes(query);
        const matchesWheel = pkg.wheels.some(
          (w) =>
            w.package_version?.includes(query) ||
            formatVersion(w.torch_version).includes(query) ||
            formatVersion(w.cuda_version).includes(query),
        );

        if (!matchesName && !matchesDesc && !matchesWheel) {
          return false;
        }
      }

      return pkg.wheels.length > 0;
    });
}

// Format a version for display
// - "3.10" → "3.10"
// - ["3.9", null] → "3.9+"
// - ["3.9", "3.12"] → "3.9 - 3.12"
// - ["3.13", "3.13"] → "3.13" (same min/max = exact version)
// - [null, null] → "any"
export function formatVersion(version: VersionRange | null | undefined): string {
  if (!version) return 'any';

  if (typeof version === 'string') {
    return normalizeVersion(version);
  }

  if (!Array.isArray(version)) {
    console.warn('Unexpected version format:', version);
    return 'any';
  }

  const [min, max] = version;

  // Both null = any version
  if (min === null && max === null) {
    return 'any';
  }

  // Only min = X+ (minimum version)
  if (min !== null && max === null) {
    return `${normalizeVersion(min)}+`;
  }

  // Only max = ≤X (maximum version)
  if (min === null && max !== null) {
    return `≤${normalizeVersion(max)}`;
  }

  // Both set - check if they're the same
  const minNorm = normalizeVersion(min!);
  const maxNorm = normalizeVersion(max!);

  if (minNorm === maxNorm) {
    // Same version = exact version, no range display
    return minNorm;
  }

  // Different versions = range
  return `${minNorm} - ${maxNorm}`;
}

// Check if a wheel version matches the filter criteria
// Handles both string and array version formats
export function versionMatchesFilter(
  wheelVersion: VersionRange | null | undefined,
  filterVersion: string,
): boolean {
  if (!filterVersion || !wheelVersion) return false;

  const filterVer = normalizeVersion(filterVersion);

  // If wheel version is a string, exact match
  if (typeof wheelVersion === 'string') {
    // Legacy support: handle ">" prefix in string
    const wheelVer = normalizeVersion(wheelVersion);
    if (wheelVer.startsWith('>')) {
      const minVersion = wheelVer.slice(1);
      return compareVersionStrings(filterVer, minVersion) > 0;
    }
    return wheelVer === filterVer;
  }

  // Verify it's an array
  if (!Array.isArray(wheelVersion)) {
    console.warn('Unexpected wheelVersion format:', wheelVersion);
    return false;
  }

  // If wheel version is an array [min, max]
  const [min, max] = wheelVersion;

  // Check minimum bound
  if (min !== null) {
    const minVer = normalizeVersion(min);
    if (compareVersionStrings(filterVer, minVer) < 0) {
      return false; // Filter version is below minimum
    }
  }

  // Check maximum bound
  if (max !== null) {
    const maxVer = normalizeVersion(max);
    if (compareVersionStrings(filterVer, maxVer) > 0) {
      return false; // Filter version is above maximum
    }
  }

  return true;
}

// Compare two version strings (-1: a < b, 0: a == b, 1: a > b)
export function compareVersionStrings(a: string, b: string): number {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);

  const maxLen = Math.max(aParts.length, bParts.length);

  for (let i = 0; i < maxLen; i++) {
    const aVal = aParts[i] || 0;
    const bVal = bParts[i] || 0;

    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
  }

  return 0;
}

export function extractUniqueVersions(packages: Package[]): {
  pythonVersions: string[];
  torchVersions: string[];
  cudaVersions: string[];
} {
  const pythonVersions = new Set<string>();
  const torchVersions = new Set<string>();
  const cudaVersions = new Set<string>();

  packages.forEach((pkg) => {
    pkg.wheels.forEach((wheel) => {
      // Extract concrete versions from VersionRange
      extractConcreteVersions(wheel.python_version).forEach((v) => pythonVersions.add(v));
      extractConcreteVersions(wheel.torch_version).forEach((v) => torchVersions.add(v));
      extractConcreteVersions(wheel.cuda_version).forEach((v) => cudaVersions.add(v));
    });
  });

  return {
    pythonVersions: sortVersions(Array.from(pythonVersions)),
    torchVersions: sortVersions(Array.from(torchVersions)),
    cudaVersions: sortVersions(Array.from(cudaVersions)),
  };
}

// Extract concrete version numbers from a VersionRange for filter buttons
// - "3.10" → ["3.10"]
// - ["3.9", null] → ["3.9"]  (only show min for ABI3)
// - ["3.9", "3.12"] → ["3.9", "3.12"]
// - [null, null] → []  (no specific version)
function extractConcreteVersions(version: VersionRange | null | undefined): string[] {
  if (!version) return [];

  if (typeof version === 'string') {
    const v = normalizeVersion(version);
    if (v.startsWith('>')) {
      return [v.slice(1)];
    }
    return v ? [v] : [];
  }

  // Verify it's an array before destructuring
  if (!Array.isArray(version)) {
    console.warn('Unexpected version format:', version);
    return [];
  }

  const [min, max] = version;
  const versions: string[] = [];

  if (min !== null && min !== undefined) {
    versions.push(normalizeVersion(min));
  }
  if (max !== null && max !== undefined) {
    const maxVer = normalizeVersion(max);
    if (!versions.includes(maxVer)) {
      versions.push(maxVer);
    }
  }

  return versions;
}

// Normalize version by removing trailing .0 parts (2.10.0 -> 2.10, 2.0.0 -> 2.0, but 2.10.1 stays 2.10.1)
export function normalizeVersion(version: string): string {
  if (!version || typeof version !== 'string') return version || '';

  const parts = version.split('.');

  // Remove trailing .0 parts, but keep at least 2 parts (major.minor)
  while (parts.length > 2 && parts[parts.length - 1] === '0') {
    parts.pop();
  }

  return parts.join('.');
}

// Sort versions descending (highest first)
export function sortVersions(versions: string[]): string[] {
  // Filter out undefined/empty values
  const validVersions = versions.filter((v) => v && typeof v === 'string');

  // Sort versions descending (highest first)
  validVersions.sort((a, b) => compareVersionStrings(b, a));

  return validVersions;
}

export function normalizePythonVersion(version: string): string {
  return version.replace(/^3\./, '').replace(/^cp/, '3.');
}

export function generateInstallCommand(wheel: Wheel): string {
  return `pip install "${wheel.url}"`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

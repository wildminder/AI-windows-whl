export interface Source {
  name: string;
  url: string;
}

// Version can be:
// - string: exact version (e.g., "3.10")
// - [min, max]: range (e.g., ["3.9", null] = 3.9+, ["3.9", "3.12"] = 3.9-3.12)
// - [null, null]: any version
export type VersionRange = string | [string | null, string | null];

export interface Wheel {
  package_version: string;
  torch_version: VersionRange;
  python_version: VersionRange;
  cuda_version: VersionRange;
  cxx11_abi: boolean;
  url: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  official_repo: string;
  sources: Source[];
  wheels: Wheel[];
}

export interface WheelsData {
  last_updated_utc: string;
  packages: Package[];
}

export interface FilterOptions {
  searchQuery?: string;
  pythonVersion?: string;
  torchVersion?: string;
  cudaVersion?: string;
  packageId?: string;
}

export interface FilterState {
  searchQuery: string;
  pythonVersion: string | null;
  torchVersion: string | null;
  cudaVersion: string | null;
  selectedPackage: string | null;
}

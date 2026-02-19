import { describe, it, expect } from 'vitest';
import type { Package, Wheel } from '@/types';
import {
  filterWheels,
  generateInstallCommand,
  extractUniqueVersions,
  formatDate,
  normalizePythonVersion,
} from './index';

const mockWheel: Wheel = {
  package_version: '2.7.4',
  torch_version: '2.6.0',
  python_version: '3.10',
  cuda_version: '12.4',
  cxx11_abi: false,
  url: 'https://example.com/test.whl',
};

const mockPackage: Package = {
  id: 'flashattention',
  name: 'Flash Attention',
  description: 'Test package',
  official_repo: 'https://github.com/test/repo',
  sources: [],
  wheels: [mockWheel],
};

describe('filterWheels', () => {
  const packages = [mockPackage];

  it('returns all packages when no filters applied', () => {
    const result = filterWheels(packages, {});
    expect(result).toHaveLength(1);
  });

  it('filters by python version', () => {
    const result = filterWheels(packages, { pythonVersion: '3.10' });
    expect(result).toHaveLength(1);
    expect(result[0]?.wheels).toHaveLength(1);
  });

  it('returns empty for non-matching python version', () => {
    const result = filterWheels(packages, { pythonVersion: '3.99' });
    expect(result).toHaveLength(0);
  });

  it('filters by torch version', () => {
    const result = filterWheels(packages, { torchVersion: '2.6.0' });
    expect(result).toHaveLength(1);
  });

  it('filters by cuda version', () => {
    const result = filterWheels(packages, { cudaVersion: '12.4' });
    expect(result).toHaveLength(1);
  });

  it('filters by search query matching name', () => {
    const result = filterWheels(packages, { searchQuery: 'flash' });
    expect(result).toHaveLength(1);
  });

  it('filters by search query matching description', () => {
    const result = filterWheels(packages, { searchQuery: 'test' });
    expect(result).toHaveLength(1);
  });

  it('returns empty for non-matching search query', () => {
    const result = filterWheels(packages, { searchQuery: 'nonexistent' });
    expect(result).toHaveLength(0);
  });
});

describe('generateInstallCommand', () => {
  it('creates valid pip install command', () => {
    const wheel: Wheel = {
      ...mockWheel,
      url: 'https://example.com/test.whl',
    };
    const cmd = generateInstallCommand(wheel);
    expect(cmd).toBe('pip install "https://example.com/test.whl"');
  });
});

describe('extractUniqueVersions', () => {
  it('extracts unique versions from packages', () => {
    const packages: Package[] = [
      {
        ...mockPackage,
        wheels: [
          mockWheel,
          { ...mockWheel, python_version: '3.11', torch_version: '2.5.0', cuda_version: '12.1' },
        ],
      },
    ];

    const result = extractUniqueVersions(packages);

    expect(result.pythonVersions).toContain('3.10');
    expect(result.pythonVersions).toContain('3.11');
    expect(result.torchVersions).toContain('2.6.0');
    expect(result.torchVersions).toContain('2.5.0');
    expect(result.cudaVersions).toContain('12.4');
    expect(result.cudaVersions).toContain('12.1');
  });
});

describe('formatDate', () => {
  it('formats ISO date string correctly', () => {
    const date = '2026-01-23T16:35:22.001142+00:00';
    const formatted = formatDate(date);
    expect(formatted).toContain('2026');
  });
});

describe('normalizePythonVersion', () => {
  it('handles cp prefix', () => {
    expect(normalizePythonVersion('cp310')).toBe('3.10');
  });

  it('handles 3.x format', () => {
    expect(normalizePythonVersion('3.10')).toBe('3.10');
  });
});

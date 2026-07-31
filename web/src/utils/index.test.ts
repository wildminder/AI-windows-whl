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

describe('filterWheels with ABI mode', () => {
  const abiWheel: Wheel = {
    package_version: '1.0.0',
    torch_version: ['2.10', null],
    python_version: ['3.9', null],
    cuda_version: ['12.0', '12.0'],
    cxx11_abi: true,
    url: 'https://example.com/abi.whl',
  };

  const exactWheel: Wheel = {
    package_version: '1.0.0',
    torch_version: ['2.10', '2.10'],
    python_version: ['3.12', '3.12'],
    cuda_version: ['12.0', '12.0'],
    cxx11_abi: true,
    url: 'https://example.com/exact.whl',
  };

  const abiPackage: Package = {
    id: 'test-abi',
    name: 'ABI Test Package',
    description: 'Package with ABI and exact wheels',
    official_repo: 'https://github.com/test',
    sources: [],
    wheels: [abiWheel, exactWheel],
  };

  it('ABI python filter matches open-ended range with version >= min', () => {
    const result = filterWheels([abiPackage], { abiPython: true, pythonVersion: '3.12' });
    expect(result).toHaveLength(1);
    expect(result[0]?.wheels).toHaveLength(1);
    expect(result[0]?.wheels[0]?.url).toBe('https://example.com/abi.whl');
  });

  it('ABI python filter rejects exact version wheels', () => {
    const result = filterWheels([abiPackage], { abiPython: true, pythonVersion: '3.12' });
    const urls = result[0]?.wheels.map((w) => w.url);
    expect(urls).not.toContain('https://example.com/exact.whl');
  });

  it('ABI torch filter with null version matches all ABI torch wheels', () => {
    const result = filterWheels([abiPackage], { abiTorch: true });
    expect(result).toHaveLength(1);
    expect(result[0]?.wheels).toHaveLength(1);
    expect(result[0]?.wheels[0]?.url).toBe('https://example.com/abi.whl');
  });

  it('ABI python filter with version below min returns no wheels', () => {
    const result = filterWheels([abiPackage], { abiPython: true, pythonVersion: '3.8' });
    expect(result).toHaveLength(0);
  });

  it('non-ABI mode unchanged: exact python filter matches exact wheel', () => {
    const result = filterWheels([abiPackage], { pythonVersion: '3.12' });
    expect(result).toHaveLength(1);
    // Both wheels match: ABI [3.9, null] includes 3.12, and exact [3.12, 3.12] matches
    expect(result[0]?.wheels).toHaveLength(2);
  });

  it('ABI cuda filter returns no wheels when no ABI cuda ranges exist', () => {
    const result = filterWheels([abiPackage], { abiCuda: true });
    expect(result).toHaveLength(0);
  });

  it('combined ABI python + ABI torch filters match only fully ABI wheel', () => {
    const result = filterWheels([abiPackage], {
      abiPython: true,
      pythonVersion: '3.12',
      abiTorch: true,
      torchVersion: '2.11',
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.wheels).toHaveLength(1);
    expect(result[0]?.wheels[0]?.url).toBe('https://example.com/abi.whl');
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
    expect(result.torchVersions).toContain('2.6');
    expect(result.torchVersions).toContain('2.5');
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

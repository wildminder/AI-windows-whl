import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Package } from '@/types';
import { PackageCard } from './PackageCard';

const mockPackage: Package = {
  id: 'flashattention',
  name: 'Flash Attention',
  description: 'High-performance attention implementation',
  official_repo: 'https://github.com/test/repo',
  sources: [{ name: 'Source 1', url: 'https://example.com' }],
  wheels: [
    {
      package_version: '2.7.4',
      torch_version: '2.6.0',
      python_version: '3.10',
      cuda_version: '12.4',
      cxx11_abi: false,
      url: 'https://example.com/wheel.whl',
    },
  ],
};

describe('PackageCard', () => {
  it('renders package name and description', () => {
    render(
      <PackageCard
        package={mockPackage}
        pythonVersion={null}
        torchVersion={null}
        cudaVersion={null}
        isActive={true}
        matchingCount={1}
      />
    );

    expect(screen.getByText('Flash Attention')).toBeInTheDocument();
    expect(screen.getByText('High-performance attention implementation')).toBeInTheDocument();
  });

  it('displays latest version badge', () => {
    render(
      <PackageCard
        package={mockPackage}
        pythonVersion={null}
        torchVersion={null}
        cudaVersion={null}
        isActive={true}
        matchingCount={1}
      />
    );

    expect(screen.getByText('v2.7.4')).toBeInTheDocument();
  });

  it('displays wheel count', () => {
    render(
      <PackageCard
        package={mockPackage}
        pythonVersion={null}
        torchVersion={null}
        cudaVersion={null}
        isActive={true}
        matchingCount={1}
      />
    );

    expect(screen.getByText(/1.*wheel/)).toBeInTheDocument();
  });

  it('has link to official repo', () => {
    render(
      <PackageCard
        package={mockPackage}
        pythonVersion={null}
        torchVersion={null}
        cudaVersion={null}
        isActive={true}
        matchingCount={1}
      />
    );

    const link = screen.getByLabelText('View official repository');
    expect(link).toHaveAttribute('href', 'https://github.com/test/repo');
  });

  it('renders inactive state when isActive is false', () => {
    render(
      <PackageCard
        package={mockPackage}
        pythonVersion={null}
        torchVersion={null}
        cudaVersion={null}
        isActive={false}
        matchingCount={0}
      />
    );

    expect(screen.getByText('Flash Attention')).toBeInTheDocument();
    expect(screen.getByText('No matching wheels for current filters')).toBeInTheDocument();
  });
});

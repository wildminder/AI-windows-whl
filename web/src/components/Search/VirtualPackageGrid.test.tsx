import { render, screen } from '@testing-library/react';
import type { Package } from '@/types';
import { VirtualPackageGrid } from './VirtualPackageGrid';
import { PerformanceProvider } from '@/hooks/usePerformance';

const makePackage = (id: string): Package => ({
  id,
  name: `Package ${id}`,
  description: 'Test package',
  official_repo: 'https://github.com/test',
  sources: [],
  wheels: [
    {
      package_version: '1.0.0',
      python_version: '3.10',
      torch_version: '2.6.0',
      cuda_version: '12.4',
      cxx11_abi: false,
      url: 'https://example.com/test.whl',
    },
  ],
});

function renderWithProvider(ui: React.ReactElement) {
  return render(<PerformanceProvider>{ui}</PerformanceProvider>);
}

describe('VirtualPackageGrid', () => {
  it('renders with list role', () => {
    const packages = [makePackage('pkg1')];
    const matchingCounts = new Map([['pkg1', 1]]);

    renderWithProvider(
      <VirtualPackageGrid
        packages={packages}
        pythonVersion={null}
        torchVersion={null}
        cudaVersion={null}
        matchingCounts={matchingCounts}
      />,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('handles empty packages array', () => {
    renderWithProvider(
      <VirtualPackageGrid
        packages={[]}
        pythonVersion={null}
        torchVersion={null}
        cudaVersion={null}
        matchingCounts={new Map()}
      />,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('creates virtual container with correct total height', () => {
    const packages = [makePackage('pkg1'), makePackage('pkg2')];
    const matchingCounts = new Map([
      ['pkg1', 1],
      ['pkg2', 0],
    ]);

    const { container } = renderWithProvider(
      <VirtualPackageGrid
        packages={packages}
        pythonVersion={null}
        torchVersion={null}
        cudaVersion={null}
        matchingCounts={matchingCounts}
      />,
    );

    // Virtual container should have height = count * estimateSize (2 * 150 = 300)
    const innerDiv = container.querySelector('[style*="height"]');
    expect(innerDiv).toBeInTheDocument();
    expect(innerDiv?.getAttribute('style')).toContain('300px');
  });
});

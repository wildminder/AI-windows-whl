import { render, screen, fireEvent } from '@testing-library/react';
import type { Package } from '@/types';
import { PackageDetails } from './PackageDetails';

const mockPackage: Package = {
  id: 'flashattention',
  name: 'Flash Attention',
  description: 'High-performance attention',
  official_repo: 'https://github.com/test',
  sources: [{ name: 'HuggingFace', url: 'https://huggingface.co' }],
  wheels: [
    {
      package_version: '2.7.4',
      python_version: '3.10',
      torch_version: '2.6.0',
      cuda_version: '12.4',
      cxx11_abi: false,
      url: 'https://example.com/wheel1.whl',
    },
    {
      package_version: '2.7.4',
      python_version: '3.11',
      torch_version: '2.6.0',
      cuda_version: '12.4',
      cxx11_abi: false,
      url: 'https://example.com/wheel2.whl',
    },
  ],
};

const defaultProps = {
  package: mockPackage,
  onClose: vi.fn(),
  initialPython: null as string | null,
  initialTorch: null as string | null,
  initialCuda: null as string | null,
};

describe('PackageDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders package name in header', () => {
    render(<PackageDetails {...defaultProps} />);
    expect(screen.getByText('Flash Attention')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<PackageDetails {...defaultProps} />);
    expect(screen.getByLabelText('Close package details')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    render(<PackageDetails {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Close package details'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('renders version selectors', () => {
    render(<PackageDetails {...defaultProps} />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('PyTorch')).toBeInTheDocument();
    expect(screen.getByText('CUDA')).toBeInTheDocument();
  });

  it('renders version options', () => {
    render(<PackageDetails {...defaultProps} />);
    // Version appears in both selector button and wheel list
    expect(screen.getAllByText('3.10').length).toBeGreaterThan(0);
    expect(screen.getAllByText('3.11').length).toBeGreaterThan(0);
  });

  it('shows matching wheel count', () => {
    render(<PackageDetails {...defaultProps} />);
    expect(screen.getByText('2 matching wheels')).toBeInTheDocument();
  });

  it('shows RECOMMENDED badge on first wheel', () => {
    render(<PackageDetails {...defaultProps} />);
    expect(screen.getByText('RECOMMENDED')).toBeInTheDocument();
  });

  it('renders pip install buttons', () => {
    render(<PackageDetails {...defaultProps} />);
    const buttons = screen.getAllByText('pip install');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders URL copy buttons', () => {
    render(<PackageDetails {...defaultProps} />);
    const buttons = screen.getAllByText('URL');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders sources section', () => {
    render(<PackageDetails {...defaultProps} />);
    expect(screen.getByText('Sources')).toBeInTheDocument();
    expect(screen.getByText('HuggingFace')).toBeInTheDocument();
  });

  it('filters wheels when version selected', () => {
    render(<PackageDetails {...defaultProps} initialPython="3.10" />);
    expect(screen.getByText('1 matching wheel')).toBeInTheDocument();
  });

  it('shows no matching message when filter excludes all', () => {
    render(<PackageDetails {...defaultProps} initialPython="3.8" />);
    expect(screen.getByText('No matching wheels')).toBeInTheDocument();
  });
});

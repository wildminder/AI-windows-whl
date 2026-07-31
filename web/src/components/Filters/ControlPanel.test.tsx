import { render, screen, fireEvent } from '@testing-library/react';
import { ControlPanel } from './ControlPanel';

// Mock usePerformance
vi.mock('@/hooks/usePerformance', () => ({
  usePerformance: () => ({ animationsEnabled: false, toggleAnimations: vi.fn() }),
}));

const defaultProps = {
  pythonVersions: ['3.12', '3.11', '3.10'],
  torchVersions: ['2.6', '2.5'],
  cudaVersions: ['12.4', '12.1'],
  selectedPython: null as string | null,
  selectedTorch: null as string | null,
  selectedCuda: null as string | null,
  onPythonChange: vi.fn(),
  onTorchChange: vi.fn(),
  onCudaChange: vi.fn(),
  onClear: vi.fn(),
};

describe('ControlPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all three version sections', () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('PyTorch')).toBeInTheDocument();
    expect(screen.getByText('CUDA')).toBeInTheDocument();
  });

  it('renders version buttons', () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText('3.12')).toBeInTheDocument();
    expect(screen.getByText('2.6')).toBeInTheDocument();
    expect(screen.getByText('12.4')).toBeInTheDocument();
  });

  it('renders Any buttons for each section', () => {
    render(<ControlPanel {...defaultProps} />);
    const anyButtons = screen.getAllByText('Any');
    expect(anyButtons.length).toBe(3);
  });

  it('calls onPythonChange when version clicked', () => {
    render(<ControlPanel {...defaultProps} />);
    fireEvent.click(screen.getByText('3.12'));
    expect(defaultProps.onPythonChange).toHaveBeenCalledWith('3.12');
  });

  it('calls onPythonChange with null when Any clicked', () => {
    render(<ControlPanel {...defaultProps} selectedPython="3.12" />);
    const anyButtons = screen.getAllByText('Any');
    fireEvent.click(anyButtons[0]); // First Any = Python
    expect(defaultProps.onPythonChange).toHaveBeenCalledWith(null);
  });

  it('shows clear button when filters active', () => {
    render(<ControlPanel {...defaultProps} selectedPython="3.12" />);
    expect(screen.getByLabelText('Clear all version filters')).toBeInTheDocument();
  });

  it('hides clear button when no filters', () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.queryByLabelText('Clear all version filters')).not.toBeInTheDocument();
  });

  it('calls onClear when clear button clicked', () => {
    render(<ControlPanel {...defaultProps} selectedPython="3.12" />);
    fireEvent.click(screen.getByLabelText('Clear all version filters'));
    expect(defaultProps.onClear).toHaveBeenCalled();
  });

  it('shows PEP-style display when filters active', () => {
    render(<ControlPanel {...defaultProps} selectedPython="3.12" selectedCuda="12.4" />);
    expect(screen.getByText('cu124')).toBeInTheDocument();
    expect(screen.getByText('-cp312')).toBeInTheDocument();
  });

  it('highlights selected version button', () => {
    render(<ControlPanel {...defaultProps} selectedPython="3.12" />);
    const button = screen.getByText('3.12');
    expect(button.getAttribute('aria-checked')).toBe('true');
  });
});

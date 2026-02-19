import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with placeholder text', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    expect(screen.getByPlaceholderText('Search packages...')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('Search packages...');
    
    fireEvent.change(input, { target: { value: 'flash' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('flash');
  });

  it('displays current value', () => {
    render(<SearchBar value="test query" onChange={mockOnChange} />);
    expect(screen.getByDisplayValue('test query')).toBeInTheDocument();
  });

  it('shows clear button when value exists', () => {
    render(<SearchBar value="test" onChange={mockOnChange} />);
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('clears value when clear button clicked', () => {
    render(<SearchBar value="test" onChange={mockOnChange} />);
    const clearButton = screen.getByLabelText('Clear search');
    
    fireEvent.click(clearButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('does not show clear button when value is empty', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
  });
});

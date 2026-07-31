import { render } from '@testing-library/react';
import { PackageCardSkeleton } from './PackageCardSkeleton';

describe('PackageCardSkeleton', () => {
  it('renders with aria-hidden', () => {
    const { container } = render(<PackageCardSkeleton />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with animate-pulse class', () => {
    const { container } = render(<PackageCardSkeleton />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('renders skeleton placeholder elements', () => {
    const { container } = render(<PackageCardSkeleton />);
    expect(container.querySelectorAll('.bg-surface-lighter').length).toBeGreaterThan(3);
  });
});

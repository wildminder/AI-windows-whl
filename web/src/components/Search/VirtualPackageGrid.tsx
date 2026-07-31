import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Package } from '@/types';
import { PackageCard } from './PackageCard';

interface VirtualPackageGridProps {
  packages: Package[];
  pythonVersion: string | null;
  torchVersion: string | null;
  cudaVersion: string | null;
  matchingCounts: Map<string, number>;
}

export function VirtualPackageGrid({
  packages,
  pythonVersion,
  torchVersion,
  cudaVersion,
  matchingCounts,
}: VirtualPackageGridProps): JSX.Element {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: packages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 3,
  });

  return (
    <div
      ref={parentRef}
      className="overflow-auto max-h-[70vh] space-y-4"
      role="list"
      aria-label="Python wheel packages"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const pkg = packages[virtualItem.index];
          const matchingCount = matchingCounts.get(pkg.id) ?? 0;
          const isActive = matchingCount > 0;

          return (
            <div
              key={pkg.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
              className="pb-4"
            >
              <PackageCard
                package={pkg}
                pythonVersion={pythonVersion}
                torchVersion={torchVersion}
                cudaVersion={cudaVersion}
                isActive={isActive}
                matchingCount={matchingCount}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

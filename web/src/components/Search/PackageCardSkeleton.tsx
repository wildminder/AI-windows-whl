export function PackageCardSkeleton(): JSX.Element {
  return (
    <div
      className="bg-surface border border-border rounded-xl overflow-hidden animate-pulse"
      aria-hidden="true"
    >
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-surface-lighter rounded-lg w-10 h-10" />
            <div className="space-y-2">
              <div className="h-5 w-32 bg-surface-lighter rounded" />
              <div className="h-3 w-48 bg-surface-lighter rounded" />
            </div>
          </div>
          <div className="p-2 bg-surface-lighter rounded-lg w-8 h-8" />
        </div>
        {/* Stats row */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
          <div className="h-4 w-20 bg-surface-lighter rounded" />
          <div className="w-px h-4 bg-border" />
          <div className="h-4 w-24 bg-surface-lighter rounded" />
        </div>
      </div>
    </div>
  );
}

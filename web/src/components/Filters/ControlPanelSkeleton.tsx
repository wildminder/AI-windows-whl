export function ControlPanelSkeleton(): JSX.Element {
  return (
    <section
      className="w-full bg-surface border border-border rounded-xl p-4 animate-pulse"
      aria-hidden="true"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-3 w-16 bg-surface-lighter rounded" />
      </div>
      {/* Three columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-14 bg-surface-lighter rounded" />
            <div className="flex gap-1.5">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-6 w-12 bg-surface-lighter rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

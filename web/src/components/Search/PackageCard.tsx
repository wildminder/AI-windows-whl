import { motion, AnimatePresence } from 'framer-motion';
import { Package, ExternalLink, ChevronDown, AlertCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { Package as PackageType, Wheel } from '@/types';
import { usePerformance } from '@/hooks/usePerformance';
import { PackageDetails } from './PackageDetails';

interface PackageCardProps {
  package: PackageType;
  pythonVersion: string | null;
  torchVersion: string | null;
  cudaVersion: string | null;
  isActive: boolean;
  matchingCount: number;
}

// Color themes for different packages
const packageColors = [
  {
    primary: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/30',
    glow: 'rgba(34, 211, 238, 0.15)',
  },
  {
    primary: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/30',
    glow: 'rgba(192, 132, 252, 0.15)',
  },
  {
    primary: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    glow: 'rgba(52, 211, 153, 0.15)',
  },
  {
    primary: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/30',
    glow: 'rgba(251, 191, 36, 0.15)',
  },
  {
    primary: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/30',
    glow: 'rgba(251, 113, 133, 0.15)',
  },
  {
    primary: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30',
    glow: 'rgba(96, 165, 250, 0.15)',
  },
  {
    primary: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/30',
    glow: 'rgba(251, 146, 60, 0.15)',
  },
  {
    primary: 'text-teal-400',
    bg: 'bg-teal-400/10',
    border: 'border-teal-400/30',
    glow: 'rgba(45, 212, 191, 0.15)',
  },
];

function getPackageColor(packageId: string) {
  let hash = 0;
  for (let i = 0; i < packageId.length; i++) {
    hash = packageId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % packageColors.length;
  return packageColors[index];
}

function parseVersion(version: string): {
  major: number;
  minor: number;
  patch: number;
  suffix: string;
  suffixNum: number;
} {
  // Remove 'v' prefix and '>' prefix (for range versions like ">3.9")
  const cleanVersion = version.replace(/^v/, '').replace(/^>/, '');
  const parts = cleanVersion.split('.');

  const major = parseInt(parts[0]) || 0;
  const minor = parseInt(parts[1]) || 0;
  let patch = parseInt(parts[2]) || 0;
  let suffix = '';
  let suffixNum = 0;

  for (let i = 3; i < parts.length; i++) {
    const part = parts[i].toLowerCase();
    if (part.includes('post')) {
      suffix = 'post';
      suffixNum = parseInt(part.replace(/\D/g, '')) || 0;
    } else if (part.includes('rc')) {
      suffix = 'rc';
      suffixNum = parseInt(part.replace(/\D/g, '')) || 0;
    } else if (part.includes('beta') || part.includes('b')) {
      suffix = 'beta';
      suffixNum = parseInt(part.replace(/\D/g, '')) || 0;
    } else if (part.includes('alpha') || part.includes('a')) {
      suffix = 'alpha';
      suffixNum = parseInt(part.replace(/\D/g, '')) || 0;
    } else if (!isNaN(parseInt(part))) {
      patch = patch * 1000 + parseInt(part);
    }
  }

  return { major, minor, patch, suffix, suffixNum };
}

function compareVersions(a: string, b: string): number {
  const va = parseVersion(a);
  const vb = parseVersion(b);

  if (va.major !== vb.major) return vb.major - va.major;
  if (va.minor !== vb.minor) return vb.minor - va.minor;
  if (va.patch !== vb.patch) return vb.patch - va.patch;

  const suffixPriority: Record<string, number> = { post: 5, '': 4, rc: 3, beta: 2, alpha: 1 };
  const pa = suffixPriority[va.suffix] || 0;
  const pb = suffixPriority[vb.suffix] || 0;

  if (pa !== pb) return pb - pa;

  if (va.suffix === 'post') {
    return vb.suffixNum - va.suffixNum;
  } else {
    return va.suffixNum - vb.suffixNum;
  }
}

function getLatestVersion(wheels: Wheel[]) {
  if (wheels.length === 0) return '';
  const sorted = [...wheels].sort((a, b) =>
    compareVersions(a.package_version || '0.0.0', b.package_version || '0.0.0'),
  );
  return sorted[0]?.package_version || '';
}

export function PackageCard({
  package: pkg,
  pythonVersion,
  torchVersion,
  cudaVersion,
  isActive,
  matchingCount,
}: PackageCardProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const { animationsEnabled } = usePerformance();
  const latestVersion = useMemo(() => getLatestVersion(pkg.wheels), [pkg.wheels]);
  const colorScheme = useMemo(() => getPackageColor(pkg.id), [pkg.id]);

  // Common card content for inactive state
  const inactiveCardContent = (
    <article className="p-4" aria-label={`${pkg.name} - No matching wheels`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${colorScheme.bg} rounded-lg`} aria-hidden="true">
            <Package className={`w-4 h-4 ${colorScheme.primary}`} />
          </div>
          <div>
            <h3 className={`font-display font-semibold ${colorScheme.primary}`}>{pkg.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <AlertCircle className="w-3 h-3 text-text-muted" aria-hidden="true" />
              <span className="text-xs font-mono text-text-muted">
                No matching wheels for current filters
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(true)}
          className="select-none px-3 py-1.5 text-xs font-mono text-text-muted hover:text-primary border border-border/50 rounded-lg hover:border-primary/30 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label={`View all ${pkg.wheels.length} versions of ${pkg.name}`}
        >
          Show all {pkg.wheels.length}
        </button>
      </div>
    </article>
  );

  if (!isActive) {
    // Inactive card - minimized with stripes
    return (
      <>
        {animationsEnabled ? (
          <motion.div
            layout
            className={`relative bg-surface/50 border ${colorScheme.border} rounded-xl overflow-hidden transition-all opacity-60 hover:opacity-80`}
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)',
            }}
          >
            {inactiveCardContent}
          </motion.div>
        ) : (
          <div
            className={`relative bg-surface/50 border ${colorScheme.border} rounded-xl overflow-hidden transition-all opacity-60 hover:opacity-80`}
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)',
            }}
          >
            {inactiveCardContent}
          </div>
        )}

        <AnimatePresence>
          {isExpanded && (
            <PackageDetails
              package={pkg}
              onClose={() => setIsExpanded(false)}
              initialPython={pythonVersion}
              initialTorch={torchVersion}
              initialCuda={cudaVersion}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  // Active card content
  const activeCardContent = (
    <article
      className="p-5"
      aria-label={`${pkg.name} - ${matchingCount} matching wheels available`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 ${colorScheme.bg} rounded-lg transition-colors`}
            aria-hidden="true"
          >
            <Package className={`w-5 h-5 ${colorScheme.primary}`} />
          </div>
          <div>
            <h3 className={`font-display font-bold text-lg ${colorScheme.primary} leading-tight`}>
              {pkg.name}
            </h3>
            <p className="text-sm text-text-secondary mt-0.5 line-clamp-1">{pkg.description}</p>
          </div>
        </div>
        <a
          href={pkg.official_repo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`select-none p-2 text-text-muted hover:${colorScheme.primary} hover:bg-surface-lighter rounded-lg transition-colors shrink-0
                     focus:outline-none focus:ring-2 focus:ring-primary/50`}
          aria-label={`View ${pkg.name} official repository (opens in new tab)`}
          title="View official repository"
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
        {/* Latest Version Badge */}
        <div className="flex items-center gap-2">
          <span className="text-2xs font-mono text-text-muted uppercase">Latest</span>
          <span
            className={`px-2 py-0.5 ${colorScheme.bg} ${colorScheme.primary} font-mono text-sm font-semibold rounded`}
          >
            v{latestVersion}
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-border" aria-hidden="true" />

        {/* Matching Configurations */}
        <div className="flex items-center gap-2">
          <span className="text-2xs font-mono text-text-muted uppercase">Matches</span>
          <span className="font-mono text-sm">
            <span className={`${colorScheme.primary} font-semibold`}>
              {matchingCount} wheel{matchingCount !== 1 ? 's' : ''}
            </span>
          </span>
        </div>

        {/* Expand Indicator */}
        <div
          className={`ml-auto flex items-center gap-2 ${colorScheme.primary}`}
          aria-hidden="true"
        >
          <span className="text-xs font-medium">Select</span>
          {animationsEnabled ? (
            <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </motion.div>
          ) : (
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          )}
        </div>
      </div>
    </article>
  );

  // Active card - full display
  return (
    <>
      {animationsEnabled ? (
        <motion.div
          layout
          className={`bg-surface border ${colorScheme.border} rounded-xl overflow-hidden transition-all cursor-pointer group
                     focus:outline-none focus:ring-2 focus:ring-primary/50`}
          style={{ boxShadow: `0 0 20px ${colorScheme.glow}` }}
          onClick={() => setIsExpanded(true)}
          whileHover={{ y: -2, boxShadow: `0 10px 40px -10px ${colorScheme.glow}` }}
          tabIndex={0}
          role="button"
          aria-label={`Select ${pkg.name} to view wheels`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsExpanded(true);
            }
          }}
        >
          {activeCardContent}
        </motion.div>
      ) : (
        <div
          className={`bg-surface border ${colorScheme.border} rounded-xl overflow-hidden transition-all cursor-pointer group hover:border-primary/50
                     focus:outline-none focus:ring-2 focus:ring-primary/50`}
          onClick={() => setIsExpanded(true)}
          tabIndex={0}
          role="button"
          aria-label={`Select ${pkg.name} to view wheels`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsExpanded(true);
            }
          }}
        >
          {activeCardContent}
        </div>
      )}

      <AnimatePresence>
        {isExpanded && (
          <PackageDetails
            package={pkg}
            onClose={() => setIsExpanded(false)}
            initialPython={pythonVersion}
            initialTorch={torchVersion}
            initialCuda={cudaVersion}
          />
        )}
      </AnimatePresence>
    </>
  );
}

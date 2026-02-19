import { motion } from 'framer-motion';
import { X, Terminal, Copy, Check, Package, Cpu, Zap, Box, AlertCircle, Download } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import type { Package as PackageType, Wheel, VersionRange } from '@/types';
import { generateInstallCommand, sortVersions, normalizeVersion, formatVersion, versionMatchesFilter } from '@/utils';

interface PackageDetailsProps {
  package: PackageType;
  onClose: () => void;
  initialPython: string | null;
  initialTorch: string | null;
  initialCuda: string | null;
}

// Parse version string into comparable components
function parseVersion(version: string): { major: number; minor: number; patch: number; suffix: string; suffixNum: number } {
  const cleanVersion = version.replace(/^v/, '');
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
  
  const suffixPriority: Record<string, number> = { 'post': 5, '': 4, 'rc': 3, 'beta': 2, 'alpha': 1 };
  const pa = suffixPriority[va.suffix] || 0;
  const pb = suffixPriority[vb.suffix] || 0;
  
  if (pa !== pb) return pb - pa;
  
  if (va.suffix === 'post') {
    return vb.suffixNum - va.suffixNum;
  } else {
    return va.suffixNum - vb.suffixNum;
  }
}

// Extract a string version from VersionRange for sorting purposes
function getVersionString(version: VersionRange | null | undefined): string {
  if (!version) return '0';
  
  if (typeof version === 'string') {
    return normalizeVersion(version);
  }
  
  if (!Array.isArray(version)) return '0';
  
  // For ranges, use the minimum version for sorting
  const [min, max] = version;
  if (min !== null && min !== undefined) return normalizeVersion(min);
  if (max !== null && max !== undefined) return normalizeVersion(max);
  return '0';
}

function sortWheelsByLatest(wheels: Wheel[]): Wheel[] {
  return [...wheels].sort((a, b) => {
    // First compare package version
    const packageCompare = compareVersions(a.package_version || '0.0.0', b.package_version || '0.0.0');
    if (packageCompare !== 0) return packageCompare;
    
    // If package versions are equal, compare Python version (higher first)
    const pythonCompare = compareVersions(getVersionString(a.python_version), getVersionString(b.python_version));
    if (pythonCompare !== 0) return pythonCompare;
    
    // If Python versions are equal, compare PyTorch version (higher first)
    const torchCompare = compareVersions(getVersionString(a.torch_version), getVersionString(b.torch_version));
    if (torchCompare !== 0) return torchCompare;
    
    // If PyTorch versions are equal, compare CUDA version (higher first)
    return compareVersions(getVersionString(a.cuda_version), getVersionString(b.cuda_version));
  });
}

// Extract concrete version numbers from a VersionRange for filter buttons
function extractUniqueValues(wheels: Wheel[], key: keyof Wheel): string[] {
  const values = new Set<string>();
  
  wheels.forEach(w => {
    const version = w[key] as VersionRange;
    if (!version) return;
    
    if (typeof version === 'string') {
      const v = normalizeVersion(version);
      if (v && !v.startsWith('>')) {
        values.add(v);
      } else if (v && v.startsWith('>')) {
        values.add(v.slice(1));
      }
    } else if (Array.isArray(version)) {
      // Array format [min, max]
      const [min, max] = version;
      if (min !== null && min !== undefined) values.add(normalizeVersion(min));
      if (max !== null && max !== undefined) values.add(normalizeVersion(max));
    }
  });
  
  return sortVersions(Array.from(values));
}

interface SelectorPillProps {
  label: string;
  icon: React.ElementType;
  options: string[];
  value: string | null;
  onChange: (val: string | null) => void;
  accentColor: string;
  glowColor: string;
  availableSet?: Set<string>;
  'aria-label'?: string;
}

function SelectorPill({ 
  label, 
  icon: Icon, 
  options, 
  value, 
  onChange, 
  accentColor,
  glowColor,
  availableSet,
  'aria-label': ariaLabel,
}: SelectorPillProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1.5" role="group" aria-label={ariaLabel || `${label} version selector`}>
      <label className={`text-2xs font-mono uppercase flex items-center gap-1.5 ${accentColor}`}>
        <Icon className="w-3 h-3" aria-hidden="true" />
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={`Select ${label} version`}>
        {options.map(opt => {
          const isAvailable = !availableSet || availableSet.has(opt);
          const isSelected = value === opt;
          
          return (
            <button
              key={opt}
              onClick={() => isAvailable && onChange(opt === value ? null : opt)}
              disabled={!isAvailable}
              className={`select-none px-2 py-1 text-xs font-mono rounded border transition-all focus:outline-none focus:ring-2 focus:ring-current ${
                isSelected 
                  ? `${accentColor} ${glowColor} border-current shadow-[0_0_10px_currentColor]` 
                  : isAvailable
                    ? 'bg-surface border-border text-text-secondary hover:border-text-secondary'
                    : 'bg-surface/30 border-border/30 text-text-muted/40 cursor-not-allowed opacity-50'
              }`}
              style={!isAvailable ? {
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.02) 4px, rgba(255,255,255,0.02) 8px)',
              } : undefined}
              role="radio"
              aria-checked={isSelected}
              aria-disabled={!isAvailable}
              aria-label={`${label} version ${opt}${!isAvailable ? ' (no matching wheels)' : ''}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PackageDetails({ package: pkg, onClose, initialPython, initialTorch, initialCuda }: PackageDetailsProps): JSX.Element {
  // Initialize from props (main page filters) - no auto-select
  const [selectedPython, setSelectedPython] = useState<string | null>(initialPython ? normalizeVersion(initialPython) : null);
  const [selectedTorch, setSelectedTorch] = useState<string | null>(initialTorch ? normalizeVersion(initialTorch) : null);
  const [selectedCuda, setSelectedCuda] = useState<string | null>(initialCuda ? normalizeVersion(initialCuda) : null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  
  const sortedWheels = useMemo(() => sortWheelsByLatest(pkg.wheels), [pkg.wheels]);
  
  // Calculate available versions based on current selections (cascading filter)
  // Python versions are always shown (base filter)
  const pythonVersions = useMemo(() => extractUniqueValues(sortedWheels, 'python_version'), [sortedWheels]);
  
  // PyTorch versions available for selected Python AND CUDA
  const torchVersions = useMemo(() => {
    let wheels = sortedWheels;
    if (selectedPython) {
      wheels = wheels.filter(w => versionMatchesFilter(w.python_version, selectedPython));
    }
    if (selectedCuda) {
      wheels = wheels.filter(w => versionMatchesFilter(w.cuda_version, selectedCuda));
    }
    return extractUniqueValues(wheels, 'torch_version');
  }, [sortedWheels, selectedPython, selectedCuda]);
  
  // CUDA versions available for selected Python AND PyTorch
  const cudaVersions = useMemo(() => {
    let wheels = sortedWheels;
    if (selectedPython) {
      wheels = wheels.filter(w => versionMatchesFilter(w.python_version, selectedPython));
    }
    if (selectedTorch) {
      wheels = wheels.filter(w => versionMatchesFilter(w.torch_version, selectedTorch));
    }
    return extractUniqueValues(wheels, 'cuda_version');
  }, [sortedWheels, selectedPython, selectedTorch]);
  
  // Check which versions have matches (for disabling unavailable buttons)
  const availableTorchForPython = useMemo(() => {
    let wheels = sortedWheels;
    if (selectedPython) {
      wheels = wheels.filter(w => versionMatchesFilter(w.python_version, selectedPython));
    }
    if (selectedCuda) {
      wheels = wheels.filter(w => versionMatchesFilter(w.cuda_version, selectedCuda));
    }
    // Extract concrete versions for the Set
    const versions = new Set<string>();
    wheels.forEach(w => {
      const v = w.torch_version;
      if (typeof v === 'string') {
        const nv = normalizeVersion(v);
        if (!nv.startsWith('>')) versions.add(nv);
        else versions.add(nv.slice(1));
      } else if (Array.isArray(v)) {
        if (v[0] !== null && v[0] !== undefined) versions.add(normalizeVersion(v[0]));
        if (v[1] !== null && v[1] !== undefined) versions.add(normalizeVersion(v[1]));
      }
    });
    return versions;
  }, [sortedWheels, selectedPython, selectedCuda]);
  
  const availableCudaForSelections = useMemo(() => {
    let wheels = sortedWheels;
    if (selectedPython) {
      wheels = wheels.filter(w => versionMatchesFilter(w.python_version, selectedPython));
    }
    if (selectedTorch) {
      wheels = wheels.filter(w => versionMatchesFilter(w.torch_version, selectedTorch));
    }
    const versions = new Set<string>();
    wheels.forEach(w => {
      const v = w.cuda_version;
      if (typeof v === 'string') {
        const nv = normalizeVersion(v);
        if (!nv.startsWith('>')) versions.add(nv);
        else versions.add(nv.slice(1));
      } else if (Array.isArray(v)) {
        if (v[0] !== null && v[0] !== undefined) versions.add(normalizeVersion(v[0]));
        if (v[1] !== null && v[1] !== undefined) versions.add(normalizeVersion(v[1]));
      }
    });
    return versions;
  }, [sortedWheels, selectedPython, selectedTorch]);
  
  const availablePythonForSelections = useMemo(() => {
    let wheels = sortedWheels;
    if (selectedTorch) {
      wheels = wheels.filter(w => versionMatchesFilter(w.torch_version, selectedTorch));
    }
    if (selectedCuda) {
      wheels = wheels.filter(w => versionMatchesFilter(w.cuda_version, selectedCuda));
    }
    const versions = new Set<string>();
    wheels.forEach(w => {
      const v = w.python_version;
      if (typeof v === 'string') {
        const nv = normalizeVersion(v);
        if (!nv.startsWith('>')) versions.add(nv);
        else versions.add(nv.slice(1));
      } else if (Array.isArray(v)) {
        if (v[0] !== null && v[0] !== undefined) versions.add(normalizeVersion(v[0]));
        if (v[1] !== null && v[1] !== undefined) versions.add(normalizeVersion(v[1]));
      }
    });
    return versions;
  }, [sortedWheels, selectedTorch, selectedCuda]);
  
  // Prevent background scroll when modal is open (position: fixed approach)
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);
  
  // Version change handlers
  const handlePythonChange = (val: string | null) => setSelectedPython(val);
  const handleTorchChange = (val: string | null) => setSelectedTorch(val);
  const handleCudaChange = (val: string | null) => setSelectedCuda(val);
  
  // Filter wheels based on all selections
  const filteredWheels = useMemo(() => {
    return sortedWheels.filter(w => {
      if (selectedPython && !versionMatchesFilter(w.python_version, selectedPython)) return false;
      if (selectedTorch && !versionMatchesFilter(w.torch_version, selectedTorch)) return false;
      if (selectedCuda && !versionMatchesFilter(w.cuda_version, selectedCuda)) return false;
      return true;
    });
  }, [sortedWheels, selectedPython, selectedTorch, selectedCuda]);

  const handleCopy = async (wheel: Wheel) => {
    const cmd = generateInstallCommand(wheel);
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCommand(wheel.url);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyUrl = async (wheel: Wheel) => {
    try {
      await navigator.clipboard.writeText(wheel.url);
      setCopiedUrl(wheel.url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4" 
      role="dialog" 
      aria-modal="true" 
      aria-label={`${pkg.name} package details`}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        aria-hidden="true"
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl max-h-[85vh] bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
        role="document"
      >
        {/* Compact Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-light">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-md" aria-hidden="true">
              <Package className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-display font-bold text-base text-text-primary" id="package-details-title">
              {pkg.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="select-none p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-lighter rounded-md transition-colors
                       focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Close package details"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
          {/* Environment Selectors */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2 text-sm font-medium text-text-primary mb-4">
              <Terminal className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Configure Your Environment</span>
            </div>
            
            <fieldset className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-background rounded-xl border border-border/50">
              <legend className="sr-only">Environment Version Selectors</legend>
              <SelectorPill
                label="Python"
                icon={Cpu}
                options={pythonVersions}
                value={selectedPython}
                onChange={handlePythonChange}
                accentColor="text-primary"
                glowColor="bg-primary/10"
                availableSet={availablePythonForSelections}
                aria-label="Python version selector"
              />
              <SelectorPill
                label="PyTorch"
                icon={Zap}
                options={torchVersions}
                value={selectedTorch}
                onChange={handleTorchChange}
                accentColor="text-secondary"
                glowColor="bg-secondary/10"
                availableSet={availableTorchForPython}
                aria-label="PyTorch version selector"
              />
              <SelectorPill
                label="CUDA"
                icon={Box}
                options={cudaVersions}
                value={selectedCuda}
                onChange={handleCudaChange}
                accentColor="text-accent-yellow"
                glowColor="bg-accent-yellow/10"
                availableSet={availableCudaForSelections}
                aria-label="CUDA version selector"
              />
            </fieldset>
          </div>

          {/* Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary" role="status" aria-live="polite">
                {filteredWheels.length === 0 ? 'No matching wheels' : 
                 filteredWheels.length === 1 ? '1 matching wheel' : 
                 `${filteredWheels.length} matching wheels`}
              </span>
              {filteredWheels.length > 0 && (
                <span className="text-2xs font-mono text-accent-green">
                  Latest version shown first
                </span>
              )}
            </div>

            {filteredWheels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-text-muted">
                <AlertCircle className="w-8 h-8 mb-2" aria-hidden="true" />
                <p className="text-sm">No wheels match your selection</p>
                <p className="text-xs mt-1">Try adjusting the filters above</p>
              </div>
            ) : (
              <ul className="space-y-2" role="list" aria-label="Available wheel versions">
                {filteredWheels.slice(0, 10).map((wheel, idx) => (
                  <motion.li
                    key={`${idx}-${wheel.url}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      idx === 0 
                        ? 'bg-accent-green/5 border-accent-green/30' 
                        : 'bg-surface-light border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {idx === 0 && (
                        <span className="select-none px-2 py-0.5 bg-accent-green/20 text-accent-green text-2xs font-mono font-bold rounded">
                          RECOMMENDED
                        </span>
                      )}
                      <div className="flex items-center gap-3 text-sm">
                        <span className="font-mono font-semibold text-text-primary">v{wheel.package_version}</span>
                        <span className="text-text-muted" aria-hidden="true">•</span>
                        <span className="font-mono text-primary">{formatVersion(wheel.python_version)}</span>
                        <span className="text-text-muted" aria-hidden="true">•</span>
                        <span className="font-mono text-secondary">{formatVersion(wheel.torch_version)}</span>
                        <span className="text-text-muted" aria-hidden="true">•</span>
                        <span className="font-mono text-accent-yellow">{formatVersion(wheel.cuda_version)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyUrl(wheel)}
                        className={`select-none flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all 
                                    focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                          copiedUrl === wheel.url
                            ? 'bg-accent-green/20 border-accent-green text-accent-green'
                            : 'bg-surface border-border text-text-secondary hover:bg-surface-light hover:text-text-primary'
                        }`}
                        aria-label={copiedUrl === wheel.url ? 'URL copied' : `Copy wheel URL`}
                        aria-live="polite"
                      >
                        {copiedUrl === wheel.url ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span className="text-xs font-medium">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span className="text-xs font-medium">URL</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleCopy(wheel)}
                        className={`select-none flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all 
                                    focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                          copiedCommand === wheel.url
                            ? 'bg-accent-green/20 border-accent-green text-accent-green'
                            : 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20'
                        }`}
                        aria-label={copiedCommand === wheel.url ? 'Command copied' : `Copy pip install command`}
                        aria-live="polite"
                      >
                        {copiedCommand === wheel.url ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span className="text-xs font-medium">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                            <span className="text-xs font-medium">pip install</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.li>
                ))}
                {filteredWheels.length > 10 && (
                  <li className="text-center text-xs text-text-muted py-2" role="status">
                    +{filteredWheels.length - 10} more versions available
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Sources */}
          {pkg.sources && pkg.sources.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-xs font-mono text-text-muted uppercase mb-3">Sources</h4>
              <ul className="flex flex-wrap gap-2" role="list" aria-label="Package sources">
                {pkg.sources.map(source => (
                  <li key={source.name}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="select-none flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-secondary bg-surface-light border border-border rounded-lg hover:border-primary/30 hover:text-primary transition-colors
                                  focus:outline-none focus:ring-2 focus:ring-primary/50"
                      aria-label={`Download from ${source.name} (opens in new tab)`}
                    >
                      <Download className="w-3 h-3" aria-hidden="true" />
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

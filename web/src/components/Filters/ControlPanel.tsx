import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Box, X, ChevronDown } from 'lucide-react';
import { usePerformance } from '@/hooks/usePerformance';

interface ControlPanelProps {
  pythonVersions: string[];
  torchVersions: string[];
  cudaVersions: string[];
  selectedPython: string | null;
  selectedTorch: string | null;
  selectedCuda: string | null;
  onPythonChange: (v: string | null) => void;
  onTorchChange: (v: string | null) => void;
  onCudaChange: (v: string | null) => void;
  onClear: () => void;
}

interface VersionSectionProps {
  icon: React.ElementType;
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (v: string | null) => void;
  accentColor: string;
  glowColor: string;
  visibleCount: number;
  'aria-label'?: string;
}

interface OverflowPanelProps {
  isOpen: boolean;
  onClose: () => void;
  options: string[];
  selected: string | null;
  onSelect: (v: string | null) => void;
  accentColor: string;
  glowColor: string;
  label: string;
}

function OverflowPanel({
  isOpen,
  onClose,
  options,
  selected,
  onSelect,
  accentColor,
  glowColor,
  label,
}: OverflowPanelProps) {
  const { animationsEnabled } = usePerformance();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={panelRef}
      initial={animationsEnabled ? { opacity: 0, y: -10, scale: 0.95 } : {}}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={animationsEnabled ? { opacity: 0, y: -10, scale: 0.95 } : {}}
      className="absolute z-50 mt-2 bg-surface border border-border rounded-xl shadow-2xl shadow-black/50 p-3 min-w-[200px]"
      role="dialog"
      aria-label={`${label} version selector`}
    >
      <div className={`text-xs font-mono ${accentColor} uppercase tracking-wider mb-2 flex items-center gap-2`}>
        <span>{label}</span>
        <span className="text-text-muted">({options.length} versions)</span>
      </div>
      <div className="flex flex-wrap gap-1.5 max-w-[300px] max-h-[300px] overflow-y-auto" role="radiogroup" aria-label={`Available ${label} versions`}>
        {options.map((opt) => (
          <motion.button
            key={opt}
            whileHover={animationsEnabled ? { scale: 1.05 } : {}}
            whileTap={animationsEnabled ? { scale: 0.95 } : {}}
            onClick={() => {
              onSelect(selected === opt ? null : opt);
              onClose();
            }}
            className={`select-none px-2 py-1 text-xs font-mono rounded border transition-all focus:outline-none focus:ring-2 focus:ring-current ${
              selected === opt
                ? `${accentColor} ${glowColor} border-current shadow-[0_0_10px_currentColor]`
                : 'text-text-secondary border-border hover:border-text-secondary'
            }`}
            role="radio"
            aria-checked={selected === opt}
            aria-label={`${label} version ${opt}`}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function VersionSection({
  icon: Icon,
  label,
  options,
  selected,
  onSelect,
  accentColor,
  glowColor,
  visibleCount,
  'aria-label': ariaLabel,
}: VersionSectionProps) {
  const { animationsEnabled } = usePerformance();
  const [showOverflow, setShowOverflow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  // Filter options (already sorted by utils: special tags first, then descending)
  const filteredOptions = options.filter(opt => opt && opt.trim() !== '');
  
  // Split into visible and overflow
  const visibleOptions = filteredOptions.slice(0, visibleCount);
  const overflowOptions = filteredOptions.slice(visibleCount);
  const hasOverflow = overflowOptions.length > 0;

  return (
    <fieldset className="flex-1 min-w-[200px]" role="group" aria-label={ariaLabel || `${label} version selector`}>
      <legend className={`flex items-center gap-2 text-xs font-mono ${accentColor} uppercase tracking-wider mb-2`}>
        <Icon className="w-4 h-4" aria-hidden="true" />
        <span>{label}</span>
      </legend>
      
      <div ref={containerRef} className="flex flex-wrap gap-1.5 items-center" role="radiogroup" aria-label={`Select ${label} version`}>
        {/* Any button */}
        <motion.button
          whileHover={animationsEnabled ? { scale: 1.05 } : {}}
          whileTap={animationsEnabled ? { scale: 0.95 } : {}}
          onClick={() => onSelect(null)}
          className={`select-none px-2 py-1 text-xs font-mono rounded border transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-current ${
            selected === null
              ? `${accentColor} ${glowColor} border-current`
              : 'text-text-muted border-border hover:border-text-muted'
          }`}
          role="radio"
          aria-checked={selected === null}
          aria-label={`Any ${label} version`}
        >
          Any
        </motion.button>

        {/* Visible version buttons */}
        {visibleOptions.map((opt) => (
          <motion.button
            key={opt}
            whileHover={animationsEnabled ? { scale: 1.05 } : {}}
            whileTap={animationsEnabled ? { scale: 0.95 } : {}}
            onClick={() => onSelect(selected === opt ? null : opt)}
            className={`select-none px-2 py-1 text-xs font-mono rounded border transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-current ${
              selected === opt
                ? `${accentColor} ${glowColor} border-current shadow-[0_0_10px_currentColor]`
                : 'text-text-secondary border-border hover:border-text-secondary'
            }`}
            role="radio"
            aria-checked={selected === opt}
            aria-label={`${label} version ${opt}`}
          >
            {opt}
          </motion.button>
        ))}

        {/* More button */}
        {hasOverflow && (
          <div className="relative">
            <motion.button
              ref={moreButtonRef}
              whileHover={animationsEnabled ? { scale: 1.05 } : {}}
              whileTap={animationsEnabled ? { scale: 0.95 } : {}}
              onClick={() => setShowOverflow(!showOverflow)}
              className={`select-none px-2 py-1 text-xs font-mono rounded border transition-all flex items-center gap-1 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-current ${
                showOverflow
                  ? `${accentColor} ${glowColor} border-current`
                  : 'text-text-muted border-border hover:border-text-muted'
              }`}
              aria-label={`Show ${overflowOptions.length} more ${label} versions`}
              aria-expanded={showOverflow}
            >
              <span>+{overflowOptions.length}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showOverflow ? 'rotate-180' : ''}`} aria-hidden="true" />
            </motion.button>

            <AnimatePresence>
              {showOverflow && (
                <OverflowPanel
                  isOpen={showOverflow}
                  onClose={() => setShowOverflow(false)}
                  options={overflowOptions}
                  selected={selected}
                  onSelect={onSelect}
                  accentColor={accentColor}
                  glowColor={glowColor}
                  label={`More ${label}`}
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </fieldset>
  );
}

export function ControlPanel({
  pythonVersions,
  torchVersions,
  cudaVersions,
  selectedPython,
  selectedTorch,
  selectedCuda,
  onPythonChange,
  onTorchChange,
  onCudaChange,
  onClear,
}: ControlPanelProps): JSX.Element {
  const hasFilters = selectedPython || selectedTorch || selectedCuda;
  const { animationsEnabled } = usePerformance();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate visible count based on screen width
  const getVisibleCount = () => {
    if (windowWidth < 640) return 2; // Mobile: show 2 versions
    if (windowWidth < 768) return 3; // Small tablet: show 3
    if (windowWidth < 1024) return 4; // Tablet: show 4
    if (windowWidth < 1280) return 5; // Desktop: show 5
    return 6; // Large desktop: show 6
  };

  const visibleCount = getVisibleCount();

  return (
    <section className="w-full bg-surface border border-border rounded-xl p-4" aria-label="Environment version filters">
      {/* Header - PEP wheel filename style, only showing selected versions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-text-muted uppercase tracking-wider">System</span>
          {hasFilters && (
            <span className="text-xs font-mono">
              {selectedCuda && (
                <span className="text-accent-yellow">cu{selectedCuda.replace('.', '')}</span>
              )}
              {selectedTorch && (
                <span className="text-secondary">torch{selectedTorch}</span>
              )}
              {selectedPython && (
                <span className="text-primary">-cp{selectedPython.replace('.', '')}</span>
              )}
            </span>
          )}
        </div>
        {hasFilters && (
          <motion.button
            initial={animationsEnabled ? { opacity: 0, scale: 0.8 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={animationsEnabled ? { scale: 1.1 } : {}}
            whileTap={animationsEnabled ? { scale: 0.9 } : {}}
            onClick={onClear}
            className="select-none p-1 text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded"
            aria-label="Clear all version filters"
            title="Clear all filters"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        )}
      </div>

      {/* Version Sections - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <VersionSection
          icon={Cpu}
          label="Python"
          options={pythonVersions}
          selected={selectedPython}
          onSelect={onPythonChange}
          accentColor="text-primary"
          glowColor="bg-primary/10"
          visibleCount={visibleCount}
          aria-label="Python version filter"
        />

        <VersionSection
          icon={Zap}
          label="PyTorch"
          options={torchVersions}
          selected={selectedTorch}
          onSelect={onTorchChange}
          accentColor="text-secondary"
          glowColor="bg-secondary/10"
          visibleCount={visibleCount}
          aria-label="PyTorch version filter"
        />

        <VersionSection
          icon={Box}
          label="CUDA"
          options={cudaVersions}
          selected={selectedCuda}
          onSelect={onCudaChange}
          accentColor="text-accent-yellow"
          glowColor="bg-accent-yellow/10"
          visibleCount={visibleCount}
          aria-label="CUDA version filter"
        />
      </div>
    </section>
  );
}

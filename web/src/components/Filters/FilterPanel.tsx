import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Cpu, Zap, Box } from 'lucide-react';
import { useState } from 'react';
import { VersionSelector } from './VersionSelector';

interface FilterPanelProps {
  pythonVersions: string[];
  torchVersions: string[];
  cudaVersions: string[];
  selectedPython: string | null;
  selectedTorch: string | null;
  selectedCuda: string | null;
  onPythonChange: (version: string | null) => void;
  onTorchChange: (version: string | null) => void;
  onCudaChange: (version: string | null) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function FilterPanel({
  pythonVersions,
  torchVersions,
  cudaVersions,
  selectedPython,
  selectedTorch,
  selectedCuda,
  onPythonChange,
  onTorchChange,
  onCudaChange,
  hasActiveFilters,
  onClearFilters,
}: FilterPanelProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      className="bg-surface border border-border rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-light transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Filter className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-text-primary">Filters</h3>
            <p className="text-2xs font-mono text-text-muted">
              {hasActiveFilters ? 'Active filters applied' : 'Select to filter results'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                onClearFilters();
              }}
              className="select-none flex items-center gap-1 px-3 py-1.5 text-2xs font-mono text-secondary 
                       bg-secondary/10 border border-secondary/30 rounded-lg hover:bg-secondary/20 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear
            </motion.button>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-text-muted" />
          </motion.div>
        </div>
      </div>

      {/* Filter Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Python Version */}
              <VersionSelector
                icon={<Cpu className="w-4 h-4" />}
                label="Python"
                value={selectedPython}
                options={pythonVersions}
                onChange={onPythonChange}
                color="primary"
              />

              {/* PyTorch Version */}
              <VersionSelector
                icon={<Zap className="w-4 h-4" />}
                label="PyTorch"
                value={selectedTorch}
                options={torchVersions}
                onChange={onTorchChange}
                color="secondary"
              />

              {/* CUDA Version */}
              <VersionSelector
                icon={<Box className="w-4 h-4" />}
                label="CUDA"
                value={selectedCuda}
                options={cudaVersions}
                onChange={onCudaChange}
                color="accent-yellow"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

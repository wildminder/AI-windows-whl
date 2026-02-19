import { motion } from 'framer-motion';
import { Cpu, Zap, Box, X } from 'lucide-react';

interface QuickFiltersProps {
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

interface FilterChipProps {
  icon: React.ElementType;
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
  color: string;
}

function FilterChip({ icon: Icon, label, options, value, onChange, color }: FilterChipProps): JSX.Element {
  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg">
        <Icon className={`w-4 h-4 ${color}`} />
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value || null)}
          className="bg-transparent text-sm font-mono text-text-primary focus:outline-none cursor-pointer min-w-[100px]"
        >
          <option key={`${label}-any`} value="" className="bg-surface text-text-muted">Any {label}</option>
          {options.filter(opt => opt && opt.trim() !== '').map((opt, idx) => (
            <option key={`${label}-${opt}-${idx}`} value={opt} className="bg-surface">{opt}</option>
          ))}
        </select>
      </div>
      {value && (
        <button
          onClick={() => onChange(null)}
          className="select-none absolute -top-1.5 -right-1.5 w-4 h-4 bg-secondary text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

export function QuickFilters({
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
}: QuickFiltersProps): JSX.Element {
  const hasFilters = selectedPython || selectedTorch || selectedCuda;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-3 p-4 bg-surface/50 border border-border rounded-xl backdrop-blur-sm"
    >
      <span className="text-sm font-medium text-text-secondary mr-2">I need:</span>
      
      <FilterChip
        icon={Cpu}
        label="Python"
        options={pythonVersions}
        value={selectedPython}
        onChange={onPythonChange}
        color="text-primary"
      />
      
      <FilterChip
        icon={Zap}
        label="PyTorch"
        options={torchVersions}
        value={selectedTorch}
        onChange={onTorchChange}
        color="text-secondary"
      />
      
      <FilterChip
        icon={Box}
        label="CUDA"
        options={cudaVersions}
        value={selectedCuda}
        onChange={onCudaChange}
        color="text-accent-yellow"
      />

      {hasFilters && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onClear}
          className="select-none ml-auto flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-secondary 
                   bg-secondary/10 border border-secondary/30 rounded-lg hover:bg-secondary/20 transition-colors"
        >
          <X className="w-3 h-3" />
          Clear
        </motion.button>
      )}
    </motion.div>
  );
}

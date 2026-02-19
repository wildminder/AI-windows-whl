import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface VersionSelectorProps {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  options: string[];
  onChange: (version: string | null) => void;
  color: 'primary' | 'secondary' | 'accent-yellow' | 'accent-green';
}

const colorStyles = {
  primary: {
    icon: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    hover: 'hover:border-primary/50',
    selected: 'bg-primary/20 text-primary',
  },
  secondary: {
    icon: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/30',
    hover: 'hover:border-secondary/50',
    selected: 'bg-secondary/20 text-secondary',
  },
  'accent-yellow': {
    icon: 'text-accent-yellow',
    bg: 'bg-accent-yellow/10',
    border: 'border-accent-yellow/30',
    hover: 'hover:border-accent-yellow/50',
    selected: 'bg-accent-yellow/20 text-accent-yellow',
  },
  'accent-green': {
    icon: 'text-accent-green',
    bg: 'bg-accent-green/10',
    border: 'border-accent-green/30',
    hover: 'hover:border-accent-green/50',
    selected: 'bg-accent-green/20 text-accent-green',
  },
};

export function VersionSelector({
  icon,
  label,
  value,
  options,
  onChange,
  color,
}: VersionSelectorProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const styles = colorStyles[color];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option === value ? null : option);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`select-none w-full flex items-center justify-between p-3 bg-surface-light border rounded-lg 
                    transition-all duration-200 ${styles.border} ${styles.hover}`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-md ${styles.bg}`}>
            <span className={styles.icon}>{icon}</span>
          </div>
          <div className="text-left">
            <span className="text-2xs font-mono text-text-muted uppercase tracking-wider">
              {label}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`font-display font-semibold ${value ? 'text-text-primary' : 'text-text-muted'}`}
              >
                {value || `Any ${label}`}
              </span>
              {value && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleClear}
                  className="select-none p-0.5 hover:bg-surface-lighter rounded"
                >
                  <X className="w-3 h-3 text-text-muted hover:text-text-secondary" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-text-muted" />
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 right-0 mt-2 bg-surface border border-border rounded-lg 
                       shadow-2xl shadow-black/50 overflow-hidden"
          >
            <div className="max-h-48 overflow-y-auto py-1">
              {options.length === 0 ? (
                <div className="px-4 py-3 text-sm text-text-muted text-center">
                  No options available
                </div>
              ) : (
                options.map((option) => (
                  <motion.button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`select-none w-full flex items-center justify-between px-4 py-2.5 text-left
                              transition-colors duration-150 ${
                                value === option
                                  ? styles.selected
                                  : 'text-text-secondary hover:bg-surface-lighter hover:text-text-primary'
                              }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-mono text-sm">{option}</span>
                    {value === option && <Check className="w-4 h-4" />}
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  'aria-label'?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = 'Search packages...',
  'aria-label': ariaLabel = 'Search packages'
}: SearchBarProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = (): void => {
    onChange('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div
      className={`relative flex items-center ${isFocused ? 'z-20' : 'z-10'}`}
      role="search"
      aria-label="Package search"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-xl bg-primary/20 blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
      
      <div 
        className={`relative flex items-center w-full bg-surface border rounded-xl overflow-hidden transition-all duration-200 ${
          isFocused 
            ? 'border-primary shadow-[0_0_20px_rgba(0,240,255,0.15)]' 
            : 'border-border hover:border-primary/30'
        }`}
      >
        {/* Search icon */}
        <div className="flex items-center justify-center w-12 h-12 text-text-muted">
          <Search className="w-5 h-5" aria-hidden="true" />
        </div>
        
        {/* Input */}
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={ariaLabel}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="flex-1 h-12 bg-transparent text-text-primary placeholder:text-text-muted 
                     focus:outline-none font-body text-base"
          data-testid="search-input"
        />
        
        {/* Clear button */}
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="select-none flex items-center justify-center w-10 h-10 mr-2 text-text-muted 
                       hover:text-text-primary hover:bg-surface-lighter rounded-lg transition-colors
                       focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Clear search"
            title="Clear search"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        )}
      </div>
    </div>
  );
}

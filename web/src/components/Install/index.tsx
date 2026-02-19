import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal } from 'lucide-react';
import { useState } from 'react';
import type { Wheel } from '@/types';
import { generateInstallCommand } from '@/utils';

interface InstallCommandProps {
  wheel: Wheel;
}

export function InstallCommand({ wheel }: InstallCommandProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const command = generateInstallCommand(wheel);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <motion.button
        onClick={handleCopy}
        className="select-none group relative flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/30 
                 hover:border-primary hover:bg-primary/20 rounded-lg transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid="copy-button"
      >
        <Terminal className="w-4 h-4 text-primary" />
        <span className="font-mono text-2xs text-primary">Copy</span>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 
                       blur-md transition-opacity duration-200" />
      </motion.button>

      {/* Success indicator */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            className="flex items-center gap-1 text-accent-green"
            data-testid="copy-success"
          >
            <Check className="w-4 h-4" />
            <span className="text-2xs font-mono">Copied!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = '' }: CopyButtonProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={`select-none p-2 text-text-muted hover:text-primary hover:bg-surface-lighter 
                rounded-lg transition-colors ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Copy to clipboard"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Check className="w-4 h-4 text-accent-green" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Copy className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

import { motion } from 'framer-motion';
import { Cpu, Github, Zap, ZapOff } from 'lucide-react';
import { usePerformance } from '@/hooks/usePerformance';

export function Header(): JSX.Element {
  const { animationsEnabled, toggleAnimations } = usePerformance();

  const headerContent = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <a 
          href="https://wildminder.github.io/AI-windows-whl/" 
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-1"
          aria-label="Windows AI Wheels - Home"
        >
          <div className="relative" aria-hidden="true">
            {animationsEnabled && (
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-lg" />
            )}
            <div className="relative p-2 bg-surface border border-primary/30 rounded-lg">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-wider text-text-primary group-hover:text-primary transition-colors">
              WINDOWS AI WHEELS
            </span>
            <span className="text-2xs font-mono text-primary/70 tracking-widest">
              PRE-COMPILED PACKAGES
            </span>
          </div>
        </a>
        
        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          {/* Animation Toggle */}
          <button
            onClick={toggleAnimations}
            className={`select-none flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 
                       focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              animationsEnabled 
                ? 'text-amber-400 border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20' 
                : 'text-text-muted border-border bg-surface/50 hover:text-text-primary hover:border-primary/50'
            }`}
            title={animationsEnabled ? 'Disable animations (better performance)' : 'Enable animations'}
            aria-label={animationsEnabled ? 'Disable animations for better performance' : 'Enable visual animations'}
            aria-pressed={animationsEnabled}
          >
            {animationsEnabled ? (
              <>
                <Zap className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline font-mono text-xs">FX On</span>
              </>
            ) : (
              <>
                <ZapOff className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline font-mono text-xs">FX Off</span>
              </>
            )}
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/wildminder/AI-windows-whl"
            target="_blank"
            rel="noopener noreferrer"
            className="select-none flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary 
                     hover:text-primary transition-colors duration-200 border border-border 
                     hover:border-primary/50 rounded-lg bg-surface/50
                     focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="View source code on GitHub (opens in new tab)"
          >
            <Github className="w-5 h-5" aria-hidden="true" />
            <span className="hidden sm:inline font-mono">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );

  if (!animationsEnabled) {
    return (
      <header className="relative z-10 border-b border-border backdrop-blur-sm bg-background/50" role="banner">
        {headerContent}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" aria-hidden="true" />
      </header>
    );
  }

  return (
    <motion.header
      className="relative z-10 border-b border-border backdrop-blur-sm bg-background/50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      role="banner"
    >
      {headerContent}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" aria-hidden="true" />
    </motion.header>
  );
}

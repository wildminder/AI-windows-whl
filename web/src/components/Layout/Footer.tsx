import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { WheelsData } from '@/types';
import { formatDate } from '@/utils';
import { usePerformance } from '@/hooks/usePerformance';

interface FooterProps {
  data: WheelsData | null;
}

export function Footer({ data }: FooterProps): JSX.Element {
  const lastUpdated = data?.last_updated_utc;
  const { animationsEnabled } = usePerformance();

  const footerContent = (
    <>
      {/* Glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side - Made with love */}
          <motion.div 
            className="flex items-center gap-2 text-sm text-text-muted"
            whileHover={animationsEnabled ? { scale: 1.02 } : {}}
          >
            <span className="font-mono">Made with</span>
            {animationsEnabled ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                aria-hidden="true"
              >
                <Heart className="w-4 h-4 text-secondary fill-secondary" />
              </motion.div>
            ) : (
              <Heart className="w-4 h-4 text-secondary fill-secondary" aria-hidden="true" />
            )}
            <span className="font-mono">for the Windows AI community</span>
          </motion.div>
          
          {/* Right side - Last updated */}
          {lastUpdated && (
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" aria-hidden="true" />
              <span>Data updated: {formatDate(lastUpdated)}</span>
            </div>
          )}
        </div>
        
        {/* Bottom text */}
        <div className="mt-4 pt-4 border-t border-border/30 text-center">
          <p className="text-2xs font-mono text-text-muted/60">
            Wheels provided by the community • Not officially affiliated with PyTorch or Python
          </p>
        </div>
      </div>
    </>
  );

  if (!animationsEnabled) {
    return (
      <footer className="relative z-10 mt-auto border-t border-border backdrop-blur-sm bg-background/50" role="contentinfo" aria-label="Site footer">
        {footerContent}
      </footer>
    );
  }

  return (
    <motion.footer
      className="relative z-10 mt-auto border-t border-border backdrop-blur-sm bg-background/50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {footerContent}
    </motion.footer>
  );
}

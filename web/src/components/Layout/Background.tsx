import { motion } from 'framer-motion';
import { usePerformance } from '@/hooks/usePerformance';

export function Background(): JSX.Element {
  const { animationsEnabled } = usePerformance();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface" />
      
      {/* Grid pattern - static, low performance impact */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Glowing orbs - only when animations enabled */}
      {animationsEnabled && (
        <>
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-[120px] opacity-20"
            style={{ background: 'radial-gradient(circle, #00f0ff 0%, transparent 70%)' }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute right-0 bottom-0 w-96 h-96 rounded-full blur-[120px] opacity-15"
            style={{ background: 'radial-gradient(circle, #ff00a0 0%, transparent 70%)' }}
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}
      
      {/* Scanline effect - only when animations enabled */}
      {animationsEnabled && (
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.03) 2px, rgba(0, 240, 255, 0.03) 4px)',
          }}
        />
      )}
      
      {/* Vignette - static, low performance impact */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 15, 0.4) 100%)',
        }}
      />
    </div>
  );
}

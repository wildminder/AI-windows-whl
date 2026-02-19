import React, { createContext, useContext, useState, useEffect } from 'react';

interface PerformanceContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export function PerformanceProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('animationsEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('animationsEnabled', JSON.stringify(animationsEnabled));
  }, [animationsEnabled]);

  const toggleAnimations = () => {
    setAnimationsEnabled((prev: boolean) => !prev);
  };

  return (
    <PerformanceContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance(): PerformanceContextType {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}

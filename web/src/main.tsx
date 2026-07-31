import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { PerformanceProvider } from './hooks/usePerformance';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <PerformanceProvider>
        <App />
      </PerformanceProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Search, Package } from 'lucide-react';
import { Background, Header, Footer, AsciiBackground } from '@/components/Layout';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { SearchBar } from '@/components/Search';
import { PackageCard } from '@/components/Search';
import { PackageCardSkeleton } from '@/components/Search/PackageCardSkeleton';
import { ControlPanel } from '@/components/Filters';
import { ControlPanelSkeleton } from '@/components/Filters/ControlPanelSkeleton';
import { useWheels, useSearch } from '@/hooks';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { extractUniqueVersions, versionMatchesFilter } from '@/utils';
import { versionMatchesAbiFilter } from '@/utils/abi';

export function App(): JSX.Element {
  const { data, loading, error, refetch } = useWheels();
  const { filters: urlFilters, updateFilters } = useUrlFilters();
  const { query, setQuery, debouncedQuery } = useSearch(urlFilters.query);

  const [selectedPython, setSelectedPython] = useState<string | null>(urlFilters.python);
  const [selectedTorch, setSelectedTorch] = useState<string | null>(urlFilters.torch);
  const [selectedCuda, setSelectedCuda] = useState<string | null>(urlFilters.cuda);
  const [abiPython, setAbiPython] = useState<boolean>(urlFilters.abiPython ?? false);
  const [abiTorch, setAbiTorch] = useState<boolean>(urlFilters.abiTorch ?? false);
  const [abiCuda, setAbiCuda] = useState<boolean>(urlFilters.abiCuda ?? false);

  const packages = useMemo(() => data?.packages ?? [], [data]);

  const { pythonVersions, torchVersions, cudaVersions } = useMemo(
    () => extractUniqueVersions(packages),
    [packages],
  );

  // Filter packages by search query only (wheel filtering happens in PackageCard)
  const filteredPackages = useMemo(() => {
    if (!debouncedQuery) return packages;
    const query = debouncedQuery.toLowerCase();
    return packages.filter(
      (pkg) =>
        pkg.name?.toLowerCase().includes(query) ||
        pkg.description?.toLowerCase().includes(query) ||
        pkg.wheels.some(
          (w) =>
            w.package_version?.includes(query) ||
            w.torch_version?.includes(query) ||
            w.cuda_version?.includes(query),
        ),
    );
  }, [packages, debouncedQuery]);

  const handleClearFilters = () => {
    setSelectedPython(null);
    setSelectedTorch(null);
    setSelectedCuda(null);
    setAbiPython(false);
    setAbiTorch(false);
    setAbiCuda(false);
    setQuery('');
    updateFilters({
      python: null,
      torch: null,
      cuda: null,
      query: '',
      abiPython: false,
      abiTorch: false,
      abiCuda: false,
    });
  };

  const handlePythonChange = (v: string | null) => {
    setSelectedPython(v);
    updateFilters({ python: v });
  };

  const handleTorchChange = (v: string | null) => {
    setSelectedTorch(v);
    updateFilters({ torch: v });
  };

  const handleCudaChange = (v: string | null) => {
    setSelectedCuda(v);
    updateFilters({ cuda: v });
  };

  const handleAbiPythonToggle = () => {
    const next = !abiPython;
    setAbiPython(next);
    updateFilters({ abiPython: next });
  };

  const handleAbiTorchToggle = () => {
    const next = !abiTorch;
    setAbiTorch(next);
    updateFilters({ abiTorch: next });
  };

  const handleAbiCudaToggle = () => {
    const next = !abiCuda;
    setAbiCuda(next);
    updateFilters({ abiCuda: next });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-text-primary relative flex flex-col">
        <Background />
        <AsciiBackground />
        <Header />
        <main
          className="relative z-10 flex-1 w-full px-4 sm:px-6 lg:px-8 py-6"
          role="status"
          aria-live="polite"
          aria-label="Loading application"
        >
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Hero skeleton */}
            <div className="text-center space-y-4 animate-pulse" aria-hidden="true">
              <div className="h-8 w-64 bg-surface-lighter rounded mx-auto" />
              <div className="h-4 w-80 bg-surface-lighter rounded mx-auto" />
              <div className="max-w-xl mx-auto h-12 bg-surface-lighter rounded-xl" />
            </div>
            {/* Control panel skeleton */}
            <ControlPanelSkeleton />
            {/* Package grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PackageCardSkeleton key={i} />
              ))}
            </div>
          </div>
          <p className="sr-only">Loading wheel data...</p>
        </main>
        <Footer data={null} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        role="alert"
        aria-live="assertive"
      >
        <Background />
        <AsciiBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-md mx-4 p-8 bg-surface border border-secondary/50 rounded-2xl text-center"
        >
          <AlertCircle className="w-12 h-12 text-secondary mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-display font-bold text-xl text-text-primary mb-2">
            Failed to Load Data
          </h2>
          <p className="text-text-secondary mb-6 font-mono text-sm" role="alert">
            {error}
          </p>
          <button
            onClick={refetch}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 
                     hover:border-primary hover:bg-primary/20 rounded-lg text-primary font-semibold 
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Try loading data again"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary relative flex flex-col">
      <Background />
      <AsciiBackground />
      <Header />

      <main
        id="main-content"
        className="relative z-10 flex-1 w-full px-4 sm:px-6 lg:px-8 py-6"
        role="main"
        aria-label="Windows AI Wheels Package Browser"
      >
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
            role="banner"
          >
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
              Find Windows AI Wheels
            </h1>
            <p className="text-text-secondary max-w-lg mx-auto">
              Quick-search pre-compiled Python packages for your environment
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search packages (e.g., flash attention, torch, cuda...)"
                aria-label="Search for Python wheel packages"
              />
            </div>
          </motion.div>

          {/* Control Panel - System Params */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
            role="region"
            aria-label="Environment version filters"
          >
            <ControlPanel
              pythonVersions={pythonVersions}
              torchVersions={torchVersions}
              cudaVersions={cudaVersions}
              selectedPython={selectedPython}
              selectedTorch={selectedTorch}
              selectedCuda={selectedCuda}
              onPythonChange={handlePythonChange}
              onTorchChange={handleTorchChange}
              onCudaChange={handleCudaChange}
              onClear={handleClearFilters}
              abiPython={abiPython}
              abiTorch={abiTorch}
              abiCuda={abiCuda}
              onAbiPythonToggle={handleAbiPythonToggle}
              onAbiTorchToggle={handleAbiTorchToggle}
              onAbiCudaToggle={handleAbiCudaToggle}
            />
          </motion.div>

          {/* Results Count */}
          <div className="flex items-center justify-between" role="status" aria-live="polite">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="font-mono text-sm text-text-secondary">
                <span className="text-text-primary font-semibold">{filteredPackages.length}</span>{' '}
                package
                {filteredPackages.length !== 1 ? 's' : ''} available
              </span>
            </div>
            {(selectedPython || selectedTorch || selectedCuda) && (
              <span className="text-xs font-mono text-text-muted">
                Click a package to see matching wheels
              </span>
            )}
          </div>

          {/* Package Grid */}
          <section aria-label="Package results">
            {filteredPackages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
                role="status"
              >
                <Search className="w-12 h-12 text-text-muted mx-auto mb-4" aria-hidden="true" />
                <p className="text-text-secondary">No packages found matching "{debouncedQuery}"</p>
              </motion.div>
            ) : (
              <motion.ul
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                role="list"
                aria-label="Python wheel packages"
              >
                {filteredPackages
                  .map((pkg) => {
                    // Calculate matching wheels for each package
                    const matchingWheels = pkg.wheels.filter((w) => {
                      // Python: ABI mode takes precedence
                      if (abiPython) {
                        if (!versionMatchesAbiFilter(w.python_version, selectedPython)) return false;
                      } else if (
                        selectedPython &&
                        !versionMatchesFilter(w.python_version, selectedPython)
                      ) {
                        return false;
                      }
                      // Torch: ABI mode takes precedence
                      if (abiTorch) {
                        if (!versionMatchesAbiFilter(w.torch_version, selectedTorch)) return false;
                      } else if (
                        selectedTorch &&
                        !versionMatchesFilter(w.torch_version, selectedTorch)
                      ) {
                        return false;
                      }
                      // CUDA: ABI mode takes precedence
                      if (abiCuda) {
                        if (!versionMatchesAbiFilter(w.cuda_version, selectedCuda)) return false;
                      } else if (
                        selectedCuda &&
                        !versionMatchesFilter(w.cuda_version, selectedCuda)
                      ) {
                        return false;
                      }
                      return true;
                    });
                    return {
                      pkg,
                      matchingCount: matchingWheels.length,
                      isActive: matchingWheels.length > 0,
                    };
                  })
                  .sort((a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0)) // Active first
                  .map(({ pkg, matchingCount, isActive }) => (
                    <motion.li
                      key={pkg.id}
                      layout
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <PackageCard
                        package={pkg}
                        pythonVersion={selectedPython}
                        torchVersion={selectedTorch}
                        cudaVersion={selectedCuda}
                        isActive={isActive}
                        matchingCount={matchingCount}
                        abiPython={abiPython}
                        abiTorch={abiTorch}
                        abiCuda={abiCuda}
                      />
                    </motion.li>
                  ))}
              </motion.ul>
            )}
          </section>
        </div>
      </main>

      <Footer data={data} />
      <OfflineIndicator />
    </div>
  );
}

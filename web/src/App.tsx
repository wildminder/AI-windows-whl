import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Search, Package } from 'lucide-react';
import { Background, Header, Footer, AsciiBackground } from '@/components/Layout';
import { SearchBar } from '@/components/Search';
import { PackageCard } from '@/components/Search';
import { ControlPanel } from '@/components/Filters';
import { useWheels, useSearch } from '@/hooks';
import { extractUniqueVersions } from '@/utils';

export function App(): JSX.Element {
  const { data, loading, error, refetch } = useWheels();
  const { query, setQuery, debouncedQuery } = useSearch();

  const [selectedPython, setSelectedPython] = useState<string | null>(null);
  const [selectedTorch, setSelectedTorch] = useState<string | null>(null);
  const [selectedCuda, setSelectedCuda] = useState<string | null>(null);

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
    setQuery('');
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        role="status"
        aria-live="polite"
        aria-label="Loading application"
      >
        <Background />
        <AsciiBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin"
            aria-hidden="true"
          />
          <p className="font-mono text-sm text-text-secondary animate-pulse">
            Loading wheel data...
          </p>
        </div>
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
              onPythonChange={setSelectedPython}
              onTorchChange={setSelectedTorch}
              onCudaChange={setSelectedCuda}
              onClear={handleClearFilters}
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
                      if (selectedPython && !w.python_version?.includes(selectedPython))
                        return false;
                      if (selectedTorch && !w.torch_version?.includes(selectedTorch)) return false;
                      if (selectedCuda && !w.cuda_version?.includes(selectedCuda)) return false;
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
                      />
                    </motion.li>
                  ))}
              </motion.ul>
            )}
          </section>
        </div>
      </main>

      <Footer data={data} />
    </div>
  );
}

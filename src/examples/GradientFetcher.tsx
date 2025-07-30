import React, { useState, useEffect } from 'react';
import gradientsData from '@/data/gradients.json';

// Type definition for gradient data
interface Gradient {
  name: string;
  colors: string[];
  colorsname: string[];
  keywords: string[][];
}

const GradientFetcher: React.FC = () => {
  const [gradients, setGradients] = useState<Gradient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Loads gradients from the local gradientsData
  const loadGradients = () => {
    setIsLoading(true);
    setError(null);
    try {
      setGradients(gradientsData as Gradient[]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load gradients'
      );
      console.error('Error loading gradients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadGradients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Retry just calls local loader again
  const handleRetry = () => {
    loadGradients();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading gradients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-red-500 mb-4">
          <p className="font-semibold">Error loading gradients</p>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Loaded {gradients.length} Gradients
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gradients.slice(0, 6).map((gradient) => (
          <div
            key={gradient.name}
            className="p-4 border rounded-lg shadow-sm"
          >
            <h3 className="font-semibold mb-2">{gradient.name}</h3>
            <div
              className="h-20 rounded mb-3"
              style={{
                background: `linear-gradient(135deg, ${gradient.colors.join(', ')})`,
              }}
            />
            <div className="text-sm text-muted-foreground">
              <p>
                <strong>Colors:</strong> {gradient.colorsname.join(', ')}
              </p>
              <p>
                <strong>Keywords:</strong>{' '}
                {gradient.keywords.flat().slice(0, 3).join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
      {gradients.length > 6 && (
        <p className="text-center text-muted-foreground mt-4">
          ...and {gradients.length - 6} more gradients
        </p>
      )}
    </div>
  );
};

export default GradientFetcher;

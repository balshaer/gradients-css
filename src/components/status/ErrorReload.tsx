// Status/ErrorReload.tsx
export const ErrorReload = ({ error }: { error: string }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <p className="mb-4 text-red-500">Error loading gradients: {error}</p>
    <button
      onClick={() => window.location.reload()}
      className="hover:bg-primary/90 rounded-md bg-primary px-4 py-2 text-primary-foreground"
    >
      Retry
    </button>
  </div>
);

// Status/NoResultsMsg.tsx
export const NoResultsMsg = ({ count, filterText }: { count: number; filterText?: string }) =>
  <div className="text-foreground/70 text-sm">
    No gradients found {filterText && `for ${filterText}`}.
  </div>;

// Status/EndOfListMsg.tsx
export const EndOfListMsg = ({ count }: { count: number }) => (
  <div className="text-foreground/60 py-8 text-center">
    <p>You've reached the end! 🎉</p>
    <p className="mt-1 text-sm">Showing all {count} gradients</p>
  </div>
);

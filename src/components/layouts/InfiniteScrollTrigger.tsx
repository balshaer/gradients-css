interface InfiniteScrollTriggerProps {
  hasMore: boolean;
  isLoading: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement>;
}

export const InfiniteScrollTrigger: React.FC<InfiniteScrollTriggerProps> = ({ hasMore, isLoading, loadMoreRef }) => {
  if (!hasMore) return null;
  return (
    <div ref={loadMoreRef} className="flex justify-center py-8">
      {isLoading ? (
        <div className="text-foreground/60 flex items-center gap-2">
          <div className="border-primary/30 h-5 w-5 animate-spin rounded-full border-2 border-t-primary"></div>
          <span>Loading more gradients...</span>
        </div>
      ) : (
        <div className="text-foreground/40 text-sm">Scroll to load more</div>
      )}
    </div>
  );
};

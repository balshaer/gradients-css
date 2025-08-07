export const StatusFilterMsg = ({
  count,
  selectedColors,
  searchTerm,
  filter,
}: {
  count: number;
  selectedColors: string[];
  searchTerm: string;
  filter: string;
}) =>
  (selectedColors.length > 0 || searchTerm || filter !== "all") ? (
    <div className="text-foreground/70 text-sm">
      Showing {count} gradient{count !== 1 ? "s" : ""}
      {selectedColors.length > 0 && (
        <span> with colors: {selectedColors.join(", ")}</span>
      )}
    </div>
  ) : null;

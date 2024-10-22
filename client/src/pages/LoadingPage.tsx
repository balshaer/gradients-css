export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-50 m-auto flex h-[100vh] w-[100vw] flex-col items-center justify-center overflow-hidden bg-[var(--background)] font-semibold text-[var(--headline)]">
      <div className="flex flex-col items-center justify-center gap-4">
        <span>Loading ...</span>
        <span className="loader"></span>
      </div>
    </div>
  );
}

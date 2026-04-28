export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-8 h-8 border-4 border-violet-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-indigo-300 text-sm">Fetching todos...</p>
    </div>
  );
}

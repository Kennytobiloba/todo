interface Props {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm font-medium px-4 py-3 rounded-xl">
      <span>⚠️ {message}</span>
      <button
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="text-rose-300 hover:text-white transition"
      >
        ✕
      </button>
    </div>
  );
}

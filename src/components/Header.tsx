interface Props {
  loading: boolean;
  totalCount: number;
  completedCount: number;
}

export function Header({ loading, totalCount, completedCount }: Props) {
  const subtitle = loading
    ? 'Loading...'
    : totalCount === 0
    ? 'Nothing here yet — add your first task!'
    : `${completedCount} of ${totalCount} completed`;

  return (
    <div className="mb-6 sm:mb-8 text-center">
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-1 drop-shadow-lg">
        ✅ My Todos
      </h1>
      <p className="text-indigo-300 text-sm font-medium">{subtitle}</p>
    </div>
  );
}

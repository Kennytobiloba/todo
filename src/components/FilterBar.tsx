import type { Filter } from '../types';

interface Props {
  filter: Filter;
  onFilter: (f: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const tabs: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function FilterBar({ filter, onFilter, activeCount, completedCount, onClearCompleted }: Props) {
  return (
    <div className="flex items-center justify-between mt-5 pt-4 border-t-2 border-white/10 text-sm">
      <span className="text-indigo-300 font-medium">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="flex gap-1">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => onFilter(tab.value)}
            className={`px-3 py-1.5 rounded-lg transition font-semibold text-xs ${
              filter === tab.value
                ? 'bg-violet-500 text-white shadow-md shadow-violet-900'
                : 'text-indigo-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <button
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="text-indigo-300 hover:text-rose-400 disabled:opacity-30 disabled:cursor-not-allowed transition font-medium text-xs"
      >
        Clear done
      </button>
    </div>
  );
}

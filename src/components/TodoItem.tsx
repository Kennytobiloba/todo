import { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const priorityStyles = {
  low: 'bg-emerald-100 text-emerald-600 border-emerald-200',
  medium: 'bg-amber-100 text-amber-600 border-amber-200',
  high: 'bg-rose-100 text-rose-500 border-rose-200',
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleEditSubmit = () => {
    onEdit(todo.id, editText);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  };

  return (
    <li className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border-2 border-transparent hover:border-violet-500/40 rounded-2xl px-3 sm:px-4 py-3 transition">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
          todo.completed
            ? 'bg-violet-500 border-violet-500 shadow-md shadow-violet-200'
            : 'border-slate-300 hover:border-violet-400'
        }`}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Text / Edit */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-white focus:outline-none border-b-2 border-violet-400 text-sm font-medium"
          />
        ) : (
          <span
            onDoubleClick={() => setEditing(true)}
            title="Double-click to edit"
            className={`block truncate text-sm font-medium cursor-pointer select-none ${
              todo.completed ? 'line-through text-white/30' : 'text-white'
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Priority badge — hidden on xs */}
      <span className={`hidden sm:inline-flex flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${priorityStyles[todo.priority]}`}>
        {todo.priority}
      </span>

      {/* Actions — always visible on mobile, hover on desktop */}
      <div className="flex-shrink-0 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
        <button
          onClick={() => setEditing(true)}
          aria-label="Edit todo"
          className="p-1.5 rounded-lg text-white/30 hover:text-violet-300 hover:bg-violet-500/20 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
          className="p-1.5 rounded-lg text-white/30 hover:text-rose-400 hover:bg-rose-500/20 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  );
}

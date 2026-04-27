import { useState } from 'react';
import type { Priority } from '../types';

interface Props {
  onAdd: (text: string, priority: Priority) => void;
}

const priorities: { value: Priority; label: string }[] = [
  { value: 'low', label: '🟢 Low' },
  { value: 'medium', label: '🟡 Medium' },
  { value: 'high', label: '🔴 High' },
];

export function AddTodo({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:border-violet-400 transition text-sm font-medium"
      />
      <div className="flex gap-2">
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
          className="flex-1 sm:flex-none bg-white/10 border-2 border-white/20 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-violet-400 transition cursor-pointer text-sm font-medium"
        >
          {priorities.map(p => (
            <option key={p.value} value={p.value} className="bg-indigo-950 text-white">
              {p.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex-1 sm:flex-none bg-violet-500 hover:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-5 py-3 rounded-xl transition shadow-md shadow-violet-900"
        >
          Add
        </button>
      </div>
    </form>
  );
}

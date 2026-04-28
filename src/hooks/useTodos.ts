import { useState, useEffect, useCallback } from 'react';
import type { Todo, Filter, Priority } from '../types';
import { todoApi } from '../api/todoApi';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch {
      setError('Could not reach the API. Is json-server running on port 3001?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  // ── Add ──────────────────────────────────────────────────────────────────
  const addTodo = async (text: string, priority: Priority) => {
    if (!text.trim()) return;
    try {
      const newTodo = await todoApi.create(text, priority, todos.length);
      setTodos(prev => [...prev, newTodo]);
    } catch {
      setError('Failed to add todo.');
    }
  };

  // ── Toggle ───────────────────────────────────────────────────────────────
  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    // Optimistic update
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    try {
      await todoApi.update(id, { completed: !todo.completed });
    } catch {
      setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: todo.completed } : t));
      setError('Failed to update todo.');
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const deleteTodo = async (id: string) => {
    const prev = todos;
    setTodos(p => p.filter(t => t.id !== id));
    try {
      await todoApi.delete(id);
    } catch {
      setTodos(prev);
      setError('Failed to delete todo.');
    }
  };

  // ── Edit ─────────────────────────────────────────────────────────────────
  const editTodo = async (id: string, text: string) => {
    if (!text.trim()) return;
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t));
    try {
      await todoApi.update(id, { text });
    } catch {
      setError('Failed to edit todo.');
    }
  };

  // ── Clear completed ──────────────────────────────────────────────────────
  const clearCompleted = async () => {
    const completed = todos.filter(t => t.completed);
    setTodos(prev => prev.filter(t => !t.completed));
    try {
      await Promise.all(completed.map(t => todoApi.delete(t.id)));
    } catch {
      setError('Failed to clear completed todos.');
      fetchTodos();
    }
  };

  // ── Reorder (drag & drop) ────────────────────────────────────────────────
  const reorderTodos = async (reordered: Todo[]) => {
    setTodos(reordered);
    try {
      await todoApi.reorder(reordered);
    } catch {
      setError('Failed to save new order.');
      fetchTodos();
    }
  };

  // ── Derived ──────────────────────────────────────────────────────────────
  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    loading,
    error,
    setError,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    reorderTodos,
    activeCount: todos.filter(t => !t.completed).length,
    completedCount: todos.filter(t => t.completed).length,
    totalCount: todos.length,
  };
}

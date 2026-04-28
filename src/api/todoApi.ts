

import type { Todo, Priority } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// JSONPlaceholder todo shape
interface ApiTodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

// Map API shape → our internal Todo shape
function mapTodo(api: ApiTodo, index: number): Todo {
  const priorities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
  return {
    id: String(api.id),
    text: api.title,
    completed: api.completed,
    priority: priorities[index % 3],
    order: index,
    createdAt: Date.now() - index * 1000,
  };
}

export const todoApi = {
  // Fetch first 5 todos
  async getAll(): Promise<Todo[]> {
    const data = await request<ApiTodo[]>(`${BASE_URL}?_limit=5`);
    return data.map(mapTodo);
  },

  // POST — JSONPlaceholder echoes back a fake created resource
  async create(text: string, priority: Priority, order: number): Promise<Todo> {
    const data = await request<ApiTodo>(BASE_URL, {
      method: 'POST',
      body: JSON.stringify({ title: text, completed: false, userId: 1 }),
    });
    return {
      id: `local-${Date.now()}`, // fake unique id since API returns id:201 always
      text,
      completed: false,
      priority,
      order,
      createdAt: Date.now(),
    };
  },

  // PATCH — JSONPlaceholder accepts but doesn't persist
  async update(id: string, changes: Partial<Todo>): Promise<void> {
    if (id.startsWith('local-')) return;
    await request(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(changes),
    });
  },

  // DELETE — JSONPlaceholder accepts but doesn't persist
  async delete(id: string): Promise<void> {
    if (id.startsWith('local-')) return;
    await request(`${BASE_URL}/${id}`, { method: 'DELETE' });
  },

  async reorder(todos: Todo[]): Promise<void> {
    // Reorder is local-only — no bulk PATCH on JSONPlaceholder
    await Promise.resolve(todos);
  },
};

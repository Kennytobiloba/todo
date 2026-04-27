import { useTodos } from './hooks/useTodos';
import { AddTodo } from './components/AddTodo';
import { TodoItem } from './components/TodoItem';
import { FilterBar } from './components/FilterBar';

function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-1 drop-shadow-lg">
            ✅ My Todos
          </h1>
          <p className="text-indigo-300 text-sm font-medium">
            {totalCount === 0
              ? 'Nothing here yet — add your first task!'
              : `${completedCount} of ${totalCount} completed`}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
          <AddTodo onAdd={addTodo} />

          {todos.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center py-12 text-slate-300">
              <svg className="w-12 h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm text-slate-400">No tasks here</p>
            </div>
          )}

          {totalCount > 0 && (
            <FilterBar
              filter={filter}
              onFilter={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>

        <p className="text-center text-indigo-400 text-xs mt-5">
          Double-click any task to edit · Data saved locally
        </p>
      </div>
    </div>
  );
}

export default App;

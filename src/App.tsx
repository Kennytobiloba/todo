import { useTodos } from './hooks/useTodos';
import { Header } from './components/Header';
import { ErrorBanner } from './components/ErrorBanner';
import { AddTodo } from './components/AddTodo';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TodoList } from './components/TodoList';
import { EmptyState } from './components/EmptyState';
import { FilterBar } from './components/FilterBar';

function App() {
  const {
    todos,
    allTodos,
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
    activeCount,
    completedCount,
    totalCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex items-start justify-center pt-8 sm:pt-16 px-3 sm:px-4 pb-8">
      <div className="w-full max-w-lg">

        <Header loading={loading} totalCount={totalCount} completedCount={completedCount} />

        {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

        <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20">
          <AddTodo onAdd={addTodo} />

          {loading && <LoadingSpinner />}

          {!loading && todos.length === 0 && <EmptyState />}

          {!loading && todos.length > 0 && (
            <TodoList
              todos={todos}
              allTodos={allTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              onReorder={reorderTodos}
            />
          )}

          {totalCount > 0 && !loading && (
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
          Double-click to edit · Drag ⠿ to reorder · Data synced with API
        </p>

      </div>
    </div>
  );
}

export default App;

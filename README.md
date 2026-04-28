# Todo App

A React + TypeScript todo application with drag-and-drop, API integration, and Docker support.

---

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS v4** for styling
- **@dnd-kit** for drag-and-drop reordering
- **JSONPlaceholder** as mock REST API
- **Vite** for bundling
- **Nginx** for production serving
- **Docker** for containerisation

---

## Running Locally (without Docker)

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at **http://localhost:5173**

---

## Running with Docker

**Prerequisites:** Docker Desktop installed and running

### 1. Build the image

```bash
docker build -t todo-app .
```

### 2. Run the container

```bash
docker run -p 8080:80 todo-app
```

App runs at **http://localhost:8080**

### Stop the container

```bash
# Find the container ID
docker ps

# Stop it
docker stop <container-id>
```

---

## Project Structure

```
src/
├── api/
│   └── todoApi.ts          # All API calls — swap BASE_URL for real backend
├── hooks/
│   └── useTodos.ts         # All state logic + API integration
├── components/
│   ├── Header.tsx           # Page title and subtitle
│   ├── ErrorBanner.tsx      # Dismissable error messages
│   ├── AddTodo.tsx          # Add todo form
│   ├── LoadingSpinner.tsx   # Loading state
│   ├── EmptyState.tsx       # Empty list state
│   ├── TodoList.tsx         # Drag-and-drop list container
│   ├── SortableTodoItem.tsx # DnD wrapper per item
│   ├── TodoItem.tsx         # Single todo row
│   └── FilterBar.tsx        # All / Active / Completed filters
└── App.tsx                  # Root — composition only
```

---

## Features

| Feature | Status |
|---|---|
| Add todos | ✅ |
| Mark complete | ✅ |
| Delete todos | ✅ |
| Filter All / Active / Completed | ✅ |
| Clear completed | ✅ |
| Drag-and-drop reorder | ✅ |
| API integration (JSONPlaceholder) | ✅ |
| Optimistic UI updates | ✅ |
| Responsive (mobile + desktop) | ✅ |
| Dockerised | ✅ |

---

## API Integration

All API calls are centralised in `src/api/todoApi.ts`. The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a mock backend.

To connect a real backend, change one line:

```ts
// src/api/todoApi.ts
const BASE_URL = 'https://your-real-api.com/todos';
```

No other files need to change.

# Todo App

Todo app is a basic todo application which uses .NET core, SQLite for backend and React + Vite for frontend.

# Running the app
## Backend

```bash
cd backend/api
dotnet restore
dotnet run
```

API runs at: http://localhost:5058

## Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at http://localhost:5173/

# Assumptions

- Only a single user (theres no authentication support)
- Small dataset - no pagination has been added.
- Frontend and backend run on separate dev servers.

# Architecture

Backend 
- Core -  Business entities & interfaces
- Database → EF Core DbContext, SQLite configuration, repositories
- Api → Controllers, DTOs, REST endpoints

Frontend 
- Components (TaskList, AddTaskForm)
- Service layer for API calls
- Material UI for styling

## How the System Works

- React frontend calls API via TaskService.ts
- API controllers handle requests
- Controllers call the repository layer
- EF Core talks to SQLite
- Results are returned to the frontend
- UI re-renders task list

# App Features
- Create tasks
- List tasks
- Delete tasks
- Update tasks
- SQLite persistent store
- CORS-enabled API
- React UI with components/services separation

# Current API Endpoints

GET /api/tasks - Retrieve all tasks.

GET /api/tasks/{id} - Retrieve a single task.

POST /api/tasks - Create a new task.

PUT /api/tasks/{id} - Update a task.

DELETE /api/tasks/{id}- Delete a task.

# Future improvements 
- Add unit tests
- Add logging, metrics and a health check endpoint 
- Multi User support - Add authentication, user management (registration and login), store tasks per user
- API performance improvements - Add pagination, add filters, and Search capability
- Front end scalability improvements, such as: Local caching to make the app feel snappier and reduce network calls
- Backend scalability improvements, such as: Add caching layer using Redis to reduce DB reads, add database indexing for IsCompleted, CreatedAt, Deploy multiple API instances behind a load balancer, replace SQLite with PostgresSQL to allow scaling horizontally

import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import Stats from './components/Stats';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

const SAMPLE_TASKS = [
  {
    id: crypto.randomUUID(),
    title: 'Welcome! Double-click a task to rename it',
    category: 'Personal',
    dueDate: null,
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Drag tasks by the ⋮⋮ handle to reorder them',
    category: 'Work',
    dueDate: null,
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', SAMPLE_TASKS);
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const handleReorderTasks = (draggedId, targetId) => {
    setTasks((prevTasks) => {
      const updated = [...prevTasks];
      const fromIndex = updated.findIndex((task) => task.id === draggedId);
      const toIndex = updated.findIndex((task) => task.id === targetId);
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  };

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatches =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && !task.completed) ||
        (statusFilter === 'Completed' && task.completed);

      const categoryMatches =
        categoryFilter === 'All' || task.category === categoryFilter;

      return statusMatches && categoryMatches;
    });
  }, [tasks, statusFilter, categoryFilter]);

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <TaskForm onAddTask={handleAddTask} />

        <FilterBar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        <Stats tasks={tasks} />

        {isLoading ? (
          <div className="app__loading">Loading your tasks…</div>
        ) : (
          <TaskList
            tasks={visibleTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onReorder={handleReorderTasks}
          />
        )}
      </main>
    </div>
  );
}

export default App;
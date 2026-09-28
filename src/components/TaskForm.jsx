import { useState } from 'react';

const CATEGORY_OPTIONS = ['Work', 'Personal', 'Urgent'];

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Please enter a task title.');
      return;
    }

    onAddTask({
      id: crypto.randomUUID(),
      title: trimmedTitle,
      category,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    setTitle('');
    setCategory('Work');
    setDueDate('');
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__row">
        <input
          type="text"
          className="task-form__input"
          placeholder="What do you need to do?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-label="Task title"
        />

        <select
          className="task-form__select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Task category"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="task-form__date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          aria-label="Due date"
        />

        <button type="submit" className="task-form__submit">
          Add Task
        </button>
      </div>

      {error && <p className="task-form__error">{error}</p>}
    </form>
  );
}

export default TaskForm;
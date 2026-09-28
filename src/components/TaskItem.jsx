import { useState } from 'react';

function isOverdue(dueDate, completed) {
  if (!dueDate || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
}

function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);

  const overdue = isOverdue(task.dueDate, task.completed);

  const classes = ['task-item'];
  if (task.completed) classes.push('task-item--completed');
  if (overdue) classes.push('task-item--overdue');

  const handleSave = () => {
    const trimmed = draftTitle.trim();
    if (trimmed) {
      onEdit(task.id, trimmed);
    }
    setIsEditing(false);
  };

  return (
    <li
      className={classes.join(' ')}
      draggable
      onDragStart={(event) => onDragStart(event, task.id)}
      onDragOver={onDragOver}
      onDrop={(event) => onDrop(event, task.id)}
    >
      <span className="task-item__drag-handle" aria-hidden="true">
        ⋮⋮
      </span>

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as complete`}
      />

      {isEditing ? (
        <input
          type="text"
          className="task-item__edit-input"
          value={draftTitle}
          onChange={(event) => setDraftTitle(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleSave()}
          autoFocus
        />
      ) : (
        <span className="task-item__title" onDoubleClick={() => setIsEditing(true)}>
          {task.title}
        </span>
      )}

      <span className="task-item__badge">{task.category}</span>

      {task.dueDate && (
        <span className="task-item__due">
          {overdue ? '⚠ Overdue: ' : 'Due: '}
          {task.dueDate}
        </span>
      )}

      <div className="task-item__actions">
        {isEditing ? (
          <button onClick={handleSave} className="task-item__save">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="task-item__edit">
            Edit
          </button>
        )}
        <button onClick={() => onDelete(task.id)} className="task-item__delete">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
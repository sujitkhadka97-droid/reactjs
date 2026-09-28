import { useRef } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete, onEdit, onReorder }) {
  const dragItemId = useRef(null);

  const handleDragStart = (event, id) => {
    dragItemId.current = id;
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetId) => {
    event.preventDefault();
    if (dragItemId.current !== null && dragItemId.current !== targetId) {
      onReorder(dragItemId.current, targetId);
    }
    dragItemId.current = null;
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <p>No tasks here. Add one above, or try a different filter.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </ul>
  );
}

export default TaskList;
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.completed ? ' completed' : ''}`}>
      <label className="task-label">
        <input
          className="task-check"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-text">{task.text}</span>
      </label>
      <button type="button" className="delete-btn" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.text}`}>
        Delete
      </button>
      <hr />
    </li>
  )
}
export default TaskItem

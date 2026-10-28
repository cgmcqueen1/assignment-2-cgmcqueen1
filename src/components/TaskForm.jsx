import { useState } from 'react'
function TaskForm({ onAdd }) {
  const [text, setText] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="input-label" htmlFor="new-task">new task</label>
      <div className="form-row">
        <input id="new-task" type="text" placeholder="add a task" value={text} onChange={event => setText(event.target.value)} />
        <button type="submit">add task</button>
      </div>
    </form>
  )
}
export default TaskForm

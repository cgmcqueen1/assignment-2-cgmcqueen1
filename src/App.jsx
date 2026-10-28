import { useState } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import TaskCounter from './components/TaskCounter'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Call Mom', completed: false },
    { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
    { id: 3, text: 'Return the textbook to Josie', completed: false },
    { id: 4, text: 'Buy the new album by Rake', completed: false },
    { id: 5, text: 'Buy a gift card for Dad', completed: false },
  ])
  const [filter, setFilter] = useState('All')
  const completedCount = tasks.filter(task => task.completed).length
  const visibleTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  function addTask(text) {
    const trimmedText = text.trim()
    if (!trimmedText) return
    setTasks(current => [
      ...current,
      { id: crypto.randomUUID(), text: trimmedText, completed: false },
    ])
  }

  function toggleTask(id) {
    setTasks(current => current.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  function deleteTask(id) {
    setTasks(current => current.filter(task => task.id !== id))
  }

  return (
    <div className="page">
      <header className="site-header">
        <img className="menu-icon" src={menuIcon} alt="Menu" />
        <div className="quick-find">
          <img className="search-icon" src={searchIcon} alt="" />
          <span>Quick Find</span>
        </div>
        <TaskCounter total={tasks.length} completed={completedCount} />
      </header>
      <div className="site-main">
        <nav className="navbar" aria-label="Task navigation">
          <ul>
            <li className="nav-item selected">
              <img className="nav-icon" src={inboxIcon} alt="" />
              <span className="nav-label">Inbox <span className="nav-count">{tasks.length}</span></span>
            </li>
            <li className="nav-item">
              <img className="nav-icon" src={calendarIcon} alt="" />
              <span>Today</span>
            </li>
            <li className="nav-item">
              <img className="nav-icon" src={upcomingIcon} alt="" />
              <span>Upcoming</span>
            </li>
          </ul>
        </nav>
        <main className="main-content">
          <h1>Inbox</h1>
          <div className="filters" aria-label="Filter tasks">
            {['All', 'Active', 'Completed'].map((name, index) => (
              <span key={name}>
                {index > 0 && <span className="separator" aria-hidden="true"> | </span>}
                <button
                  type="button"
                  className={filter === name ? 'active-filter' : ''}
                  aria-pressed={filter === name}
                  onClick={() => setFilter(name)}
                >{name}</button>
              </span>
            ))}
          </div>
          <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
          <TaskForm onAdd={addTask} />
        </main>
      </div>
    </div>
  )
}

export default App

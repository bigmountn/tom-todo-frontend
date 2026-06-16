import { useCallback, useEffect, useState } from 'react'
import * as todoApi from './api/todos'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const loadTodos = useCallback(async () => {
    setError('')
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  async function withSubmitting(action) {
    setSubmitting(true)
    setError('')
    try {
      await action()
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  async function handleAdd(title) {
    await withSubmitting(async () => {
      const newTodo = await todoApi.createTodo(title)
      setTodos((prev) => [newTodo, ...prev])
    })
  }

  async function handleUpdate(id, title) {
    await withSubmitting(async () => {
      const updated = await todoApi.updateTodo(id, title)
      setTodos((prev) => prev.map((todo) => (todo._id === id ? updated : todo)))
    })
  }

  async function handleDelete(id) {
    await withSubmitting(async () => {
      await todoApi.deleteTodo(id)
      setTodos((prev) => prev.filter((todo) => todo._id !== id))
    })
  }

  return (
    <div className="app">
      <main className="todo-app">
        <header>
          <h1>할 일 목록</h1>
          <p>오늘 해야 할 일을 추가하고 관리하세요.</p>
        </header>

        <TodoForm onSubmit={handleAdd} disabled={submitting} />

        {error && <p className="todo-error">{error}</p>}

        {loading ? (
          <p className="todo-status">불러오는 중...</p>
        ) : (
          <TodoList
            todos={todos}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            disabled={submitting}
          />
        )}
      </main>
    </div>
  )
}

export default App

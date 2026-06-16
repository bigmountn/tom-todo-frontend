import { useState } from 'react'

export default function TodoForm({ onSubmit, disabled }) {
  const [title, setTitle] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    await onSubmit(trimmed)
    setTitle('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="할 일을 입력하세요"
        disabled={disabled}
        aria-label="새 할 일"
      />
      <button type="submit" disabled={disabled || !title.trim()}>
        추가
      </button>
    </form>
  )
}

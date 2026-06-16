import { useState } from 'react'

export default function TodoItem({ todo, onUpdate, onDelete, disabled }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  async function handleSave() {
    const trimmed = editTitle.trim()
    if (!trimmed) return

    await onUpdate(todo._id, trimmed)
    setIsEditing(false)
  }

  function handleCancel() {
    setEditTitle(todo.title)
    setIsEditing(false)
  }

  async function handleDelete() {
    if (!window.confirm('이 할 일을 삭제할까요?')) return
    await onDelete(todo._id)
  }

  return (
    <li className="todo-item">
      {isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            disabled={disabled}
            autoFocus
            aria-label="할 일 수정"
          />
          <div className="todo-actions">
            <button type="button" onClick={handleSave} disabled={disabled || !editTitle.trim()}>
              저장
            </button>
            <button type="button" className="secondary" onClick={handleCancel} disabled={disabled}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className="todo-title">{todo.title}</span>
          <div className="todo-actions">
            <button
              type="button"
              className="secondary"
              onClick={() => setIsEditing(true)}
              disabled={disabled}
            >
              수정
            </button>
            <button type="button" className="danger" onClick={handleDelete} disabled={disabled}>
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  )
}

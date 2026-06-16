import TodoItem from './TodoItem'

export default function TodoList({ todos, onUpdate, onDelete, disabled }) {
  if (todos.length === 0) {
    return <p className="todo-empty">등록된 할 일이 없습니다.</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          disabled={disabled}
        />
      ))}
    </ul>
  )
}

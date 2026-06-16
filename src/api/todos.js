const API_BASE = 'https://tom-todo-backend-a77a7cb9808c.herokuapp.com/todos'

async function request(url, options = {}) {
  let response

  try {
    response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('서버에 연결할 수 없습니다. 백엔드가 실행 중인지 확인해주세요.')
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || `요청에 실패했습니다. (${response.status})`)
  }

  return data
}

export function fetchTodos() {
  return request(API_BASE)
}

export function createTodo(title) {
  return request(API_BASE, {
    method: 'POST',
    body: JSON.stringify({ title }),
  })
}

export function updateTodo(id, title) {
  return request(`${API_BASE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title }),
  })
}

export function deleteTodo(id) {
  return request(`${API_BASE}/${id}`, {
    method: 'DELETE',
  })
}

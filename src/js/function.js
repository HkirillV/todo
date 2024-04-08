export function setLocalStorage(arr) {
  localStorage.setItem('task', JSON.stringify(arr))
}

export function getLocalStorage() {
  const task = localStorage.getItem('task')
  return task ? JSON.parse(task) : []
}
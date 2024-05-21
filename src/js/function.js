



export const setCacheToTask = (arr) => {
  localStorage.setItem('task', JSON.stringify(arr))
}

export const  getCacheToTask = () => {
  const task = localStorage.getItem('task')

  return task ? JSON.parse(task) : []
}
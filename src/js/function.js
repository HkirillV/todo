const URL = 'http://localhost:3000/task'

export const taskApi = {
  getTask: async () => {
    try {
      const res = await fetch(URL)
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return await res.json()
    } catch (err) {
      console.error(err)
    }
  },
  deleteTask: async (id) => {
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return await res.json()
    } catch (err) {
      console.error()
    }
  },
  addTask: async () => {

  }

}

export const setCacheToCategoryTask = (arr) => {
  localStorage.setItem('category-task', JSON.stringify(arr))
}

export const getCacheToCategoryTask = () => {
  const categoryTask = localStorage.getItem('category-task')

  return categoryTask ? JSON.parse(categoryTask) : []
}

export const setCacheToTask = (arr) => {
  localStorage.setItem('task', JSON.stringify(arr))
}

export const getCacheToTask = () => {
  const task = localStorage.getItem('task')

  return task ? JSON.parse(task) : []
}

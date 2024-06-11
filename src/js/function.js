const URL = 'http://localhost:3000'

export const taskApi = {
  getTask: async (dbName) => {
    try {
      const res = await fetch(`${URL}/${dbName}`)
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return await res.json()
    } catch (err) {
      console.error(err)
    }
  },
  deleteTask: async (dbName, id) => {
    try {
      const res = await fetch(`${URL}/${dbName}/${id}`, {
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
  addTask: async (dbName, date) => {
    try {
      const res = await fetch(`${URL}/${dbName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(date)
      })
      if(!res.ok) {
        throw new Error(res.statusText)
      }
    }
    catch (err) {
      console.log(err)
    }
  },

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

export const checkClassIsActive = (element) => element.classList.toggle('is-active')


export const refreshPage = () => window.location.reload()


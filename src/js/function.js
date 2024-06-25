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
  addTask: async (dbName, data) => {
    try {
      const res = await fetch(`${URL}/${dbName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if(!res.ok) {
        throw new Error(res.statusText)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const categoryApi =  {
  editCategory: async (dbName, id, newNumberTasks) => {
    try {
      const res = await fetch(`${URL}/${dbName}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          tasks: newNumberTasks
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) {
        throw new Error(res.statusText)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const  dbName= {
  dbCategory: 'category',
  dbTasks: 'tasks'
}

export const setTasksToCache = (arr) => {
  localStorage.setItem('category-task', JSON.stringify(arr))
}

export const getTasksFromCache = () => {
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

export const toggleIsActive = (element) => element.classList.toggle('is-active')


export const refreshPage = () => window.location.reload()


const BASE_URL = '/db/task.json'

const parseResponse = (response) => response.json()

export const taskAPI = {
  getTask: async () => {
    return  fetch(BASE_URL).then(parseResponse)
  },
  addTask: async (id) => {
    return fetch(`${BASE_URL}/${id}`, {
      body: JSON.stringify({id})
    }).then(parseResponse)
  },
  deleteTask: async (id) => {
    return fetch(`${BASE_URL}/${id}`, {
      body: JSON.stringify({id})
    }).then(parseResponse)
  }
}

export const setLocalStorage = (arr) => {
  localStorage.setItem('task', JSON.stringify(arr))
}

export const  getLocalStorage = () => {
  const task = localStorage.getItem('task')

  return task ? JSON.parse(task) : []
}
import {getLocalStorage, setLocalStorage, taskAPI} from "./function.js";

const todoAddElement = document.querySelector('.todo__add')
const todoListElement = document.querySelector('.todo-list')

let taskElement = []

taskAPI.getTask()
  .then(data => {

    checkingRelevanceTask(data)

  })
  .catch(err => {
    console.log(err)
  })

const checkingRelevanceTask = (data) => {
  if (!data.length) {
    console.log('todo list пустой')
  }

  setLocalStorage(data)

  const newTask = getLocalStorage('task')

  renderTask(newTask)
}

const renderTask = (arr) => {

  todoListElement.innerHTML = arr.reduce((acc, el) => {
    const {id, title, img, tasks} = el
    task = `
      <div class="task" data-id="${id}">
      <img class="task__image" src="/src/img/${img}" width="70" height="70" loading="lazy" alt="work">
      <h4 class="task__title">${title}</h4>
      <span class="task__count">Tasks ${tasks}</span>
      <button class="task__delete" type="button">
        <img src="/src/img/delete.svg" width="20" height="20" loading="lazy" alt="delete">
      </button>
    </div>
      `

    return acc + task
  }, '')
}


const clickTaskDeleteButton = async (event) => {

  const taskDelete = event.target.closest('.task__delete')

  if (!taskDelete) {
    return
  }

  const task = taskDelete.closest('.task')

  const id = task.dataset.id

  taskAPI.deleteTask(id)
    .then(data => {

      checkingRelevanceTask(data)

    })
    .catch(err => {
      console.log(err)
    })
}

todoListElement.addEventListener('click', clickTaskDeleteButton)















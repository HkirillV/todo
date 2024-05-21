import {setCacheToTask, getCacheToTask, taskAPI} from "./function.js";

const todoAddElement = document.querySelector('.todo__add')
const todoListElement = document.querySelector('.todo-list')

let task =



const renderTask = (arr) => {

  todoListElement.innerHTML = arr.reduce((acc, el) => {
    const {id, title, img, tasks} = el
    const task = `
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

  const taskDeleteElement = event.target.closest('.task__delete')

  if (!taskDeleteElement) {
    return
  }

  const task = taskDeleteElement.closest('.task')

  const id = task.dataset.id

  taskAPI.deleteTask(id)
    .then(data => {



    })
    .catch(err => {
      console.log(err)
    })
}

todoListElement.addEventListener('click', clickTaskDeleteButton)















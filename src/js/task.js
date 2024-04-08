import {getLocalStorage, setLocalStorage} from "./function.js";

const todoAddElement = document.querySelector('.todo__add')
const todoListElement = document.querySelector('.todo-list')


let task = []

getTask()

todoAddElement.addEventListener('click', renderTask)

async function getTask() {
  try {
    if (!task.length) {
      const res = await fetch('/db/task.json')
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      task = await res.json()

    }
    checkingRelevanceTask()

  } catch (err) {
    console.log('ошибка')
  }
}


function checkingRelevanceTask() {
  if (!task.length) {
    console.log('todo list пустой')
  }

  setLocalStorage(task)

  const newTask = getLocalStorage('task')

  renderTask(newTask)
}

// function deleteTask (event) {
//
// }


function renderTask(arr) {

  todoListElement.innerHTML = ''

  todoListElement.innerHTML = arr.reduce((acc, el) => {
    const {id, title, img, tasks} = el
    task = `
      <div class="task" data-task="${id}">
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

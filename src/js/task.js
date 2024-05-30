import {setCacheToTask, getCacheToTask, taskApi} from "./function.js";

const todoListElement = document.querySelector('.todo-list')
const formAddTaskElement = document.querySelector('.form-add-task')
const formAddTaskButtonElement = document.querySelector('.form-add-task__button')

const getTask = getCacheToTask()

let tasks = getTask.length > 0 ? getTask : await taskApi.getTask()

const renderTask = () => {

  todoListElement.innerHTML = tasks.reduce((acc, el) => {
    const {id, title, img, tasks} = el
    const task = `
      <div class="task" data-id="${id}">
      <img class="task__image" src="/src/img/${img}" width="70" height="70" loading="lazy" alt="work">
      <h4 class="task__title">${title}</h4>
      <span class="task__count">Tasks ${tasks}</span>
      <button class="task__delete-btn" type="button">
        <img src="/src/img/delete.svg" width="20" height="20" loading="lazy" alt="delete">
      </button>
    </div>
      `

    return acc + task
  }, '')
}

setCacheToTask(tasks)
renderTask()

const removeTaskElement = (id) => {
  const taskElement = document.querySelector(`.task[data-id="${id}"]`)

  taskElement?.remove()
}

const deleteTaskElement = (event) => {
  event.preventDefault()
  const taskDeleteBtn = event.target.closest('.task__delete-btn')

  const taskElement = taskDeleteBtn.closest('.task')
  const { id } = taskElement.dataset

  taskApi.deleteTask(id)
    .then(() => {
      tasks = tasks.filter(task => task.id !== id)
      removeTaskElement(id)
      setCacheToTask(tasks)
      renderTask()
    })
    .catch(err => console.log(err))
}

const addTaskElement = (event) => {
  event.preventDefault()
  const formTaskElement = new FormData(formAddTaskElement)
  const {title, img} = Object.fromEntries(formTaskElement)
  let imgUrl = location.href=`${img.name}`
  return  console.log(imgUrl)

}

todoListElement.addEventListener('click', deleteTaskElement)

formAddTaskButtonElement.addEventListener('click', addTaskElement)












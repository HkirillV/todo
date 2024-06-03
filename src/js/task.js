import {setCacheToTask, getCacheToTask, taskApi} from "./function.js";

const categoryElement = document.querySelector('.category')
const formAddTaskElement = document.querySelector('.form-add-task')
const formAddTaskButtonElement = document.querySelector('.form-add-task__button')

const getTask = getCacheToTask()
let tasks = getTask > 0 ? getTask : await taskApi.getTask()

const renderTask = (task) => {
  categoryElement.innerHTML = task.reduce((acc, el) => {
    const {id, text, category} = el

    const task = `
     <div class="task">
      <input class="task__input" type="text" value="${text}" readonly>
      <button class="task__btn-delete"><img src="/src/img/delete.svg" width="16" height="16" loading="lazy" alt="btn-delete"></button>
     </div>
    `
    return acc + task
  }, '')
}

const checkCategorySelection = (event) => {
  if (event) {
    event.preventDefault()

    const categoryTaskElement = event.target.closest('.category__task')
    const categoryTaskTitleElement = categoryTaskElement.querySelector('h4').textContent

    const task = tasks.filter(el => {
      return el.category === categoryTaskTitleElement
    })

    if (task.length < 0) {
      const taskListIsEmpty = `<h1>Список задач пуст</h1>`
      return renderTask(taskListIsEmpty)
    }
    return renderTask(task)
  }

}

const removeTaskElement = (id) => {
  const taskElement = document.querySelector(`.category__task[data-id="${id}"]`)

  taskElement?.remove()
}

const deleteTaskElement = (event) => {
  event.preventDefault()
  const categoryTaskDeleteBtn = event.target.closest('.category__task-delete-btn')

  const categoryTaskElement = categoryTaskDeleteBtn.closest('.category__task')
  const {id} = categoryTaskElement.dataset

  taskApi.deleteTask(id)
    .then(() => {

    })
    .catch(err => console.log(err))
}

const addTaskElement = (event) => {
  event.preventDefault()
  const formTaskElement = new FormData(formAddTaskElement)
  const {text, category} = Object.fromEntries(formTaskElement)
  const id = tasks.length + Math.floor(Math.random() + tasks.length)
  const task = {id, text, category}

  taskApi.addTask(task)
    .then(() => {
      tasks.push(task)
      setCacheToTask(task)
      checkCategorySelection()
    })
    .catch(err => console.log(err))
}

categoryElement.addEventListener('click', checkCategorySelection)

formAddTaskButtonElement.addEventListener('click', addTaskElement)
import {setCacheToTask, getCacheToTask, checkClassIsActive, refreshPage, taskApi} from "./function.js";

const categoryElement = document.querySelector('.category')
const taskListElement = document.querySelector('.task-list')
const addTaskFormElement = document.querySelector('.add-task-form')
const addTaskFormButtonElement = document.querySelector('.add-task-form__button')
const returnButtonElement = document.querySelector('.navigation__return-button')

const getTask = getCacheToTask()
let tasks = getTask > 0 ? getTask : await taskApi.getTask('tasks')

const renderTask = (task) => {
  categoryElement.innerHTML = ''
  taskListElement.innerHTML = task.reduce((acc, el) => {
    const {id, taskTitle, category} = el

    const task = `
     <div class="task" data-id="${id}">
      <input class="input" value="${taskTitle}" readonly>
      <button class="delete-button-task button"><img src="/src/img/delete.svg" width="25" height="25" loading="lazy" alt="btn-delete"></button>
     </div>
    `
    return acc + task
  }, '')
}

setCacheToTask(tasks)

const removeTaskElement = (id) => {
  const taskElement = document.querySelector(`.category__task[data-id="${id}"]`)

  taskElement?.remove()
}

const deleteTaskElement = (id) => {

  taskApi.deleteTask('tasks', id)
    .then(() => {
      tasks = tasks.filter(task => task.id !== id)
      removeTaskElement(id)
      setCacheToTask(tasks)
      renderTask()
    })
    .catch(err => console.log(err))
}

const onDeleteTaskButtonClick = (event) => {
  event.preventDefault()

  const deleteButtonTaskElement = event.target.closest('.delete-button-task')
  const taskElement = deleteButtonTaskElement.closest('.task')

  const {id} = taskElement.dataset

  deleteTaskElement(id)
}

const onCategoryTaskClick = (event) => {

  if (event) {
    event.preventDefault()
    const categoryTaskElement = event.target.closest('.category__task')

    const categoryTaskTitleElement = categoryTaskElement.querySelector('h4').textContent

    const task = tasks.filter(el => el.category === categoryTaskTitleElement)
    checkClassIsActive(returnButtonElement)

    if (task.length <= 0) {
      return categoryElement.innerHTML = `<h2 class="task-list-empty">Список задач пуст!</h2>`
    }

    return renderTask(task)
  }
}

const checkCategoryTaskElement = (task) => {
  const {id, taskTitle, category} = task
  const newTask = tasks.filter(el => el.category === category)

  return renderTask(newTask)
}

const addTaskElement = (task) => {

  taskApi.addTask('tasks', task)
    .then(() => {
      tasks.push(task)
      setCacheToTask(tasks)
      checkCategoryTaskElement(task)
    })
    .catch(err => console.log(err))
}

const onAddTaskButtonClick = (event) => {
  event.preventDefault()
  const formTaskElement = new FormData(addTaskFormElement)
  const {taskTitle, category} = Object.fromEntries(formTaskElement)
  const id = tasks.length + Math.floor(Math.random() + tasks.length)
  const task = {id, taskTitle, category}

  addTaskElement(task)
}

returnButtonElement.addEventListener('click', refreshPage)

categoryElement.addEventListener('click', onCategoryTaskClick)

addTaskFormButtonElement.addEventListener('click', onAddTaskButtonClick)

taskListElement.addEventListener('click', onDeleteTaskButtonClick)

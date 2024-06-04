import {setCacheToTask, getCacheToTask, taskApi} from "./function.js";

const categoryElement = document.querySelector('.category')
const addTaskFormElement = document.querySelector('.add-task-form')
const addTaskFormButtonElement = document.querySelector('.add-task-form__button')

const getTask = getCacheToTask()
let tasks = getTask > 0 ? getTask : await taskApi.getTask('tasks')

const renderTask = (task) => {
  categoryElement.innerHTML = task.reduce((acc, el) => {
    const {id, taskTitle, category} = el

    const task = `
     <div class="task">
      <input class="input" value="${taskTitle}" readonly>
      <button class="task__btn-delete"><img src="/src/img/delete.svg" width="16" height="16" loading="lazy" alt="btn-delete"></button>
     </div>
    `
    return acc + task
  }, '')
}

const checkCategorySelection = (event) => {
  if(event) {
    event.preventDefault()

    const categoryTaskElement = event.target.closest('.category__task')
    const categoryTaskTitleElement = categoryTaskElement.querySelector('h4').textContent

    const task = tasks.filter(el => el.category === categoryTaskTitleElement)

    if (task.length <= 0) {
      return categoryElement.innerHTML = `<h2>Список задач пуст!</h2>`
    }

    return renderTask(task)
  }

}

const removeTaskElement = (id) => {
  const taskElement = document.querySelector(`.category__task[data-id="${id}"]`)

  taskElement?.remove()
}

const deleteTaskElement = (id) => {

  taskApi.deleteTask('tasks', id)
    .then(() => {

    })
    .catch(err => console.log(err))
}

const onDeleteTaskButtonClick = (event) => {
  event.preventDefault()
  const categoryTaskDeleteBtn = event.target.closest('.category__task-delete-btn')

  const categoryTaskElement = categoryTaskDeleteBtn.closest('.category__task')
  const {id} = categoryTaskElement.dataset

  deleteTaskElement(id)
}

const addTaskElement = (task) => {

  taskApi.addTask('tasks', task)
    .then(() => {
      tasks.push(task)
      setCacheToTask(task)
      checkCategorySelection()
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

categoryElement.addEventListener('click', checkCategorySelection)

addTaskFormButtonElement.addEventListener('click', onAddTaskButtonClick)
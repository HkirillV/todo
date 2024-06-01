import {setCacheToTask, getCacheToTask, taskApi} from "./function.js";

const categoryElement = document.querySelector('.category')
const formAddTaskElement = document.querySelector('.form-add-task')
const formAddTaskButtonElement = document.querySelector('.form-add-task__button')

const getTask = getCacheToTask()
let tasks = getTask > 0 ? getTask : await taskApi.getTask()

const checkCategorySelection = (event) => {
  event.preventDefault()
  const category = event.target.closest()
  return console.log(category)
  // renderTask()
}

const renderTask = (category) => {
  categoryElement.innerHTML = category.reduce((acc, el) => {
    const {id, title, img, tasks} = el
  }, '')
}

const removeTaskElement = (id) => {
  const categoryTaskElement = document.querySelector(`.category__task[data-id="${id}"]`)

  categoryTaskElement?.remove()
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

  const task = {text, category}
  taskApi.addTask()
    .then(() => {
      tasks.push(task)
      setCacheToTask(task)
      renderTask()
    })
    .catch(err => console.log(err))
}

categoryElement.addEventListener('click', checkCategorySelection)

formAddTaskButtonElement.addEventListener('click', addTaskElement)
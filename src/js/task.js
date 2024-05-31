import { taskApi} from "./function.js";

const categoryElement = document.querySelector('.category')
const formAddTaskElement = document.querySelector('.form-add-task')
const formAddTaskButtonElement = document.querySelector('.form-add-task__button')









const removeTaskElement = (id) => {
  const categoryTaskElement = document.querySelector(`.category__task[data-id="${id}"]`)

  categoryTaskElement?.remove()
}

const deleteTaskElement = (event) => {
  event.preventDefault()
  const categoryTaskDeleteBtn = event.target.closest('.category__task-delete-btn')

  const categoryTaskElement = categoryTaskDeleteBtn.closest('.category__task')
  const { id } = categoryTaskElement.dataset

  taskApi.deleteTask(id)
    .then(() => {

    })
    .catch(err => console.log(err))
}

const addTaskElement = (event) => {
  event.preventDefault()
  const formTaskElement = new FormData(formAddTaskElement)
  const {title, img} = Object.fromEntries(formTaskElement)
}

categoryElement.addEventListener('click', deleteTaskElement)

formAddTaskButtonElement.addEventListener('click', addTaskElement)
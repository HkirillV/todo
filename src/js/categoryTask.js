import {setCacheToCategoryTask, getCacheToCategoryTask, taskApi} from "./function.js";

const categoryElement = document.querySelector('.category')
const formAddTaskListCategory = document.querySelector('.form-add-task__list-category')

const getCategoryTask = getCacheToCategoryTask()

let categoryTasks = getCategoryTask.length > 0 ? getCategoryTask : await taskApi.getTask()

const renderCategoryTask = () => {

  categoryElement.innerHTML = categoryTasks.reduce((acc, el) => {
    const {id, title, img, tasks} = el
    const task = `
      <div class="category__task" data-id="${id}">
      <img class="category__task-image" src="/src/img/${img}" width="70" height="70" loading="lazy" alt="work">
      <h4 class="category__task-title">${title}</h4>
      <span class="category__task-count">Tasks ${tasks}</span>
    </div>
      `

    return acc + task
  }, '')
}

setCacheToCategoryTask(categoryTasks)
renderCategoryTask()

const categoryTaskTitle = document.querySelectorAll('.category__task-title')

const renderListCategory = () => {
  formAddTaskListCategory.innerHTML = Array.from(categoryTaskTitle).reduce((acc, el) => {
      const categoryTitle = el.textContent

    const category = `
      <option value="${categoryTitle}">${categoryTitle}</option>
    `
    return category + acc
  }, '')
}

renderListCategory()




















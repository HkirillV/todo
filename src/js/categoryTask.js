import {setCacheToCategoryTask, getCacheToCategoryTask, taskApi, categoryApi} from "./function.js";

const categoryElement = document.querySelector('.category')
const addTaskFormSelectElement = document.querySelector('.add-task-form__select')

const getCategoryTask = getCacheToCategoryTask()

const categoryTasks = getCategoryTask.length > 0 ? getCategoryTask : await taskApi.getTask('category')

const renderCategoryTask = () => {

  categoryElement.innerHTML = categoryTasks.reduce((acc, el) => {
    const {id, title, imgSrc, tasks} = el
    const task = `
      <div class="category__task" data-id="${id}">
      <img class="category__task-image" src="/src/img/${imgSrc}" width="70" height="70" loading="lazy" alt="work">
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

const renderSelectCategory = () => {
  addTaskFormSelectElement.innerHTML = Array.from(categoryTaskTitle).reduce((acc, el) => {
    const categoryTitle = el.textContent

    const category = `
      <option class="option" value="${categoryTitle}">${categoryTitle}</option>
    `
    return category + acc
  }, '')
}

export const updateNumberScoreTasksElement = (category, action) => {
  let {id, title, img, tasks} = categoryTasks.find(el => el.title === category)
  action ? tasks += 1 : tasks -= 1

  categoryTasks = categoryTasks.filter(el => el.id !== id)
  let newCategory = {id, title, img, tasks}

  if (action === true) {
    return categoryApi.editCategory("category", id, tasks)
      .then(() => {
        categoryTasks.push(newCategory)
        setCacheToCategoryTask(categoryTasks)
        renderCategoryTask()
      })
      .catch(err => console.log(err))
  }

  categoryApi.editCategory("category", id, tasks)
    .then(() => {
      categoryTasks.push(newCategory)
      setCacheToCategoryTask(categoryTasks)
    })
    .catch(err => console.log(err))
}

renderSelectCategory()




















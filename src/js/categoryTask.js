import {setTasksToCache, getTasksFromCache, taskApi, categoryApi, dbName} from "./function.js";

const categoryElement = document.querySelector('.category')
const addTaskFormSelectElement = document.querySelector('.add-task-form__select')

const getCategoryTask = getTasksFromCache()

let categoryTasks = getCategoryTask.length > 0 ? getCategoryTask : await taskApi.getTask(dbName.dbCategory)

const renderCategoryTask = () => {
  const markup = categoryTasks.reduce((totalMarkup, el) => {
    const {id, title, imgSrc, tasks} = el
    const category = `
      <div class="category__task" data-id="${id}">
        <img class="category__task-image" src="/src/img/${imgSrc}" width="70" height="70" loading="lazy" alt="">
        <h3 class="category__task-title">${title}</h3>
        <span class="category__task-count">Tasks ${tasks}</span>
      </div>
      `

    return totalMarkup + category
  }, '')
  categoryElement.innerHTML = markup
}

setTasksToCache(categoryTasks)
renderCategoryTask()

const categoryTaskTitle = document.querySelectorAll('.category__task-title')

const renderSelectCategory = () => {
  addTaskFormSelectElement.innerHTML = [...categoryTaskTitle].reduce((acc, el) => {
    const categoryTitle = el.textContent

    const category = `
      <option class="option" value="${categoryTitle}">${categoryTitle}</option>
    `
    return category + acc
  }, '')
}

export const updateNumberScoreTasksElement = (category, action) => {
   let {id, title, imgSrc, tasks} = categoryTasks.find(el => el.title === category)
  if (action) {
    tasks += 1
  } else {
    tasks -= 1
  }

  categoryTasks = categoryTasks.filter(el => el.id !== id)
  let newCategory = {id, title, imgSrc, tasks}

  if (action) {
    return categoryApi.editCategory(dbName.dbCategory, id, tasks)
      .then(() => {
        categoryTasks.push(newCategory)
        setTasksToCache(categoryTasks)
        renderCategoryTask()
      })
      .catch(console.log)
  } else {
    categoryApi.editCategory(dbName.dbCategory, id, tasks)
      .then(() => {
        categoryTasks.push(newCategory)
        setTasksToCache(categoryTasks)
      })
      .catch(console.log)
  }
}

renderSelectCategory()




















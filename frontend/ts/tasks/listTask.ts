import { initModal, toggleModal } from "../common/modal.js"

var tasks: Array<Object>
var containerTasks = document.querySelector('.container-tasks') as HTMLDivElement

//Event listener para quando finalizar carregamento da pagina
window.addEventListener('load', async () => {
  await getTasks()
  updateTaskCards('0')
  updateTaskButtons()
  initModal('modal')
})

document.querySelector('.footer')?.addEventListener('click', (event) => {
  let clickedElement = event.target as HTMLButtonElement
  if (clickedElement.tagName == "BUTTON") {

    let page = clickedElement.dataset.page!

    updateTaskCards(page)
  }
})

containerTasks.addEventListener('click', event => {
  let target = event.target as HTMLElement
  
  if (target.classList.contains('deleteBtn')) {
      let deleteId = document.querySelector('#deleteId') as HTMLInputElement
      let id = target.dataset.id
      if (id) deleteId.value = id
      toggleModal('modal')

  }
})

document.querySelector('.modal')?.addEventListener('click', event => {
  let target = event.target as HTMLElement
  if(target.classList.contains('delete')){
      let idInput = document.querySelector('#deleteId') as HTMLInputElement
      let id = idInput.value
      deleteTask(id)
  }
})

async function getTasks() {
  let response = await fetch('https://compass-node-api.herokuapp.com/api/v1/tasks', { method: 'GET' })
  tasks = await response.json()
  console.log(tasks);
}

async function updateTaskCards(page: string) {
  if (containerTasks) {
    containerTasks.innerHTML = ''
    console.log(tasks);
    tasks[page].map(el => {

      containerTasks.innerHTML += createTaskCard(el);
    })
  }
}

function createTaskCard(task: Object) {
  return `

    <div class="card">
    <div class="">
        <label for="">Description</label>
        <p class="description">
            ${task['description']}
        </p>
        <div class="div"></div>
        <label for="">User</label>
        <p class="user">
        ${task['user'] ?task['user']['name'] : 'Removed User'}
        </p>
    </div>
    <div class="">
        <label for="">Task Date</label>
        <p class="date">
        ${task['date']}
        </p>
    </div>
<div class="">
<p>
    <a href='./listTaskId.html?id=${task['_id']}'><button class="btn top">Edit</button></a>
</p>
<p>
    <button class="btn bottom deleteBtn" data-id='${task['_id']}'>Delete</button>
</p>
</div>
</div>

`
}

async function deleteTask(id: string) {
  let response = await fetch(`https://compass-node-api.herokuapp.com/api/v1/tasks/${id}`, { method: 'DELETE' })
  tasks = await response.json()
}

function updateTaskButtons() {
  let footer = document.querySelector('footer')
  if (footer) {
    footer.innerHTML = ''
    console.log(tasks.length);

    for (let x = 0; x < tasks.length; x++) {
      let b = document.createElement('button') as HTMLButtonElement
      b.dataset.page = x + ""
      b.textContent = (x + 1) + ""
      footer.append(b)

    }
  }
}
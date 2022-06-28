var tasks: Array<Object>
var containerTasks = document.querySelector('.container-tasks') as HTMLDivElement

//Event listener para quando finalizar carregamento da pagina
window.addEventListener('load', async () => {
  await getTasks()
  updateTaskCards(0)
  updateTaskButtons()

})

document.querySelector('.footer')?.addEventListener('click', (event) => {
  let clickedElement = event.target as HTMLButtonElement
  if (clickedElement.tagName == "BUTTON") {

    let page = clickedElement.dataset.page!

    updateTaskCards(page)
  }
})

async function getTasks() {
  let response = await fetch('http://127.0.0.1:3000/api/v1/tasks', { method: 'GET' })
  tasks = await response.json()
  console.log(tasks);
}

async function updateTaskCards(page: string) {
  if (containerTasks) {
    containerTasks.innerHTML = ''
    tasks[page].map(el => {
      console.log(el);

      containerTasks.innerHTML += createTaskCard(el);
    })
  }
}

function createTaskCard(task: Object) {
  return `
<a href='./listTaskId.html?id=${task['_id']}'
    <div class="card">
    <div class="">
        <label for="">Description</label>
        <p class="description">
            ${task['description']}
        </p>
        <div class="div"></div>
        <label for="">User</label>
        <p class="user">
        ${task['user']}
        </p>
    </div>
    <div class="">
        <label for="">Task Date</label>
        <p class="date">
        ${task['date']}
        </p>
    </div>
</div>
</a>`
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
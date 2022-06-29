import { toggleModal, initModal } from '../common/modal.js'

initModal('modal')
initModal('searchUserModal')

window.addEventListener('load', () => {
  let searchUser = document.querySelector('#searchUser')
  if (searchUser) {
    searchUser.addEventListener('click', openSearchUserModal)
  }
  let userList = document.querySelector('.user-list-ul')
  if (userList) {
    userList.addEventListener(`click`, (event) => {
      let target = event.target as HTMLLIElement
      if (target.tagName == 'LI') {
        target.classList.add('selected')
        let input = document.querySelector('#user') as HTMLInputElement
        input.value = target.dataset.id!
        let inputName = document.querySelector('#id_name') as HTMLInputElement
        inputName.value = target.textContent!
        toggleModal(`searchUserModal`)
      }
    })
  }
})

async function openSearchUserModal() {

  let userList = document.querySelector('.user-list-ul')
  if (userList) {
    toggleModal('searchUserModal')
    userList.innerHTML = ''
    let users = Array.from(await getUsers())

    users.map((page: Array<Object>) => {
      page.map(user => {
        let li = document.createElement(`li`)
        li.textContent = user['name']
        li.dataset.id = user[`_id`]
        userList?.append(li)
      })

    })

  }
}

async function getUsers() {
  let response = await fetch('http://127.0.0.1:3000/api/v1/users', { method: 'GET' })
  return await response.json()
}

//Evento de submit do formulário POST TASK
let form = document.querySelector("#formCreateTask") as HTMLFormElement
if (form)
  form.addEventListener('submit', (event) => createTask(event))

//Chamar API e criar task
const createTask = async (event: Event) => {
  event.preventDefault()
  let response = await createRequest(event.currentTarget as HTMLFormElement)
  let json = await response['json']()
  let statusCode = response['status']
  if (statusCode == 400)
    showErrors(json['message'])
  else if (statusCode == 201) {
    toggleModal('modal')
  }

}

async function createRequest(form: HTMLFormElement): Promise<Object> {
  let data = new FormData(form)
  let request = await fetch('http://127.0.0.1:3000/api/v1/tasks/', {
    method: 'POST',
    body: ObterFormJSON(data),
    headers: new Headers({
      'Content-Type': 'Application/Json'
    })
  })
  return request
}


function showErrors(errors: Array<string>) {
  errors.map((el: string) => {
    let element = document.querySelector(`#${el}`) as HTMLElement
    if (element)
      element.classList.add('error')
    element.parentNode?.querySelector('small')?.classList.add('visible')
  })
}

function refreshFields() {

}

function ObterFormJSON(form: FormData): string {
  var object = {};
  form.forEach((value, key) => object[key] = value);
  let json = JSON.stringify(object);
  return json
}
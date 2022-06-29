import { toggleModal, initModal } from '../common/modal.js'

initModal('modal')
var id: string | null

initModal('searchUserModal')

window.addEventListener('load', () => {

})


async function openSearchUserModal(event) {
    if (event.target.dataset.enabled == 'true') {

        let userList = document.querySelector('.user-list-ul')
        if (userList) {
            toggleModal('searchUserModal')
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
}

async function getUsers() {
    let response = await fetch('http://127.0.0.1:3000/api/v1/users', { method: 'GET' })
    return await response.json()
}
window.addEventListener('load', async () => {
    let userList = document.querySelector('.user-list-ul')
    if (userList) {
        userList.innerHTML = ''
        userList.addEventListener(`click`, (event) => {
            let target = event.target as HTMLLIElement
            if (target.tagName == 'LI') {
                console.log("LI");

                target.classList.add('selected')
                let input = document.querySelector('#user') as HTMLInputElement
                input.value = target.dataset.id!
                let inputName = document.querySelector('#id_name') as HTMLInputElement
                inputName.value = target.textContent!
                toggleModal(`searchUserModal`)
            }
        })
    }
    let params = new URLSearchParams(window.location.search)
    id = params.get('id')
    let task: Object
    if (id) {
        task = await getTask(id)
        task = await task['json']()
        fillInputs(task)
        canEdit(false)
    }
    let searchUser = document.querySelector('#searchUser')
    if (searchUser) {
        searchUser.addEventListener('click', (event) => openSearchUserModal(event))
    }
})

document.querySelector('#editBtn')?.addEventListener('click', () => {
    canEdit(true)
})

document.querySelector("#formEditTask")?.addEventListener('submit', (event) => updateTask(event))

async function getTask(id: string) {
    return await fetch(`http://127.0.0.1:3000/api/v1/tasks/${id}`)
}

function fillInputs(task: Object) {
    let arrFields = getFormFields()
    arrFields?.map(e => {
        if (e.id == "date") {
            let date = new Date(task['date'])
            e['value'] = `${date.getFullYear()}-${date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() + 1} ${date.getHours()}:${date.getMinutes()}`
            return
        } else if (e.id == "user") {
            e['value'] = task['user']['_id']
            return
        } else if (e.id == "id_name") {
            e['value'] = task['user']['name']
            return
        }
        e['value'] = task[e.id]
    })
}


function getFormFields(): Array<HTMLInputElement> | null {
    let fields = document.querySelector('form')
    let arrFields: Array<Element>
    if (fields) {
        return Array.from(fields) as Array<HTMLInputElement>
    }
    return null
}

function canEdit(val: boolean) {
    let arr = getFormFields()
    arr?.forEach(e => {
        if(e.name=='id_name') return
        e.disabled = !val
    })
    let svg = document.querySelector('#searchUser') as SVGElement
    svg.dataset.enabled = val + ''
}

//Chamar API e criar task
const updateTask = async (event: Event) => {
    event.preventDefault()
    let response = await createRequest(event.currentTarget as HTMLFormElement)
    let json = await response['json']()
    let statusCode = response['status']
    console.log(statusCode);

    if (statusCode == 400)
        showErrors(json['message'])
    else if (statusCode == 200) {
        toggleModal('modal')
    }

}

async function createRequest(form: HTMLFormElement): Promise<Object> {
    let data = new FormData(form)
    let request = await fetch(`http://127.0.0.1:3000/api/v1/tasks/${id}`, {
        method: 'PUT',
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

function ObterFormJSON(form: FormData): string {
    var object = {};
    form.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);
    return json
}
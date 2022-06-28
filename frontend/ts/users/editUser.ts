import { toggleModal, initModal } from '../common/modal.js'

initModal('modal')
var id: string | null


window.addEventListener('load', async () => {
    let params = new URLSearchParams(window.location.search)
    id = params.get('id')
    let user: Object
    if (id) {
        user = await getUser(id)
        user = await user['json']()
        fillInputs(user)
        canEdit(false)
    }
})

document.querySelector('#editBtn')?.addEventListener('click', () => {
    canEdit(true)
})

document.querySelector("#formEditUser")?.addEventListener('submit', (event) => updateUser(event))

async function getUser(id: string) {
    return await fetch(`http://127.0.0.1:3000/api/v1/users/${id}`)
}

function fillInputs(user: Object) {
    let arrFields = getFormFields()
    arrFields?.map(e => {
        if (e.id == "birthDate") {
            let date = new Date(user['birthDate'])
            e['value'] = `${date.getFullYear()}-${date.getMonth()+1 <= 9 ? "0"+(date.getMonth()+1) : date.getMonth()+1}-${date.getDate() + 1}`
            return
        }
        e['value'] = user[e.id]
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

function canEdit(val: boolean){
    let arr = getFormFields()
    arr?.forEach(e => e.disabled = !val)
}

//Chamar API e criar usuário
const updateUser = async (event: Event) => {
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
    let request = await fetch(`http://127.0.0.1:3000/api/v1/users/${id}`, {
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
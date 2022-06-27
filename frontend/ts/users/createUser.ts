import { toggleModal, initModal } from '../common/modal.js'

initModal('modal')

//Evento de submit do formulário POST USER
let form = document.querySelector("#formCreateUser") as HTMLFormElement
if (form)
    form.addEventListener('submit', (event) => createUser(event))

//Chamar API e criar usuário
const createUser = async (event: Event) => {
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
    let request = await fetch('http://127.0.0.1:3000/api/v1/users/', {
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
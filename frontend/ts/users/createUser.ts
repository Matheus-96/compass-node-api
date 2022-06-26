//Evento de submit do formulário POST USER
let form = document.querySelector("#formCreateUser") as HTMLFormElement
if (form)
    form.addEventListener('submit', (event) => createUser(event))

//Chamar API e criar usuário
const createUser = async (event: Event) => {
    event.preventDefault()
    let data = new FormData(event.currentTarget as HTMLFormElement)
    let request = await fetch('http://127.0.0.1:3000/users/', {
        method: 'POST',
        body: ObterFormJSON(data),
        headers: new Headers({
            'Content-Type': 'Application/Json'
        })
    })
    let json = await request.json() as Object
    console.log(json);
    
    if(json.hasOwnProperty('error'))
        showErrors(json['message'])
}

function showErrors(errors: Array<string>){
    errors.map((el: string) => {
        let element = document.querySelector(`#${el}`) as HTMLElement
        if(element)
            element.classList.add('error')
            element.parentNode?.querySelector('small')?.classList.add('visible')
    })
}

function ObterFormJSON(form: FormData): string{
    var object = {};
    form.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);
    return json
}
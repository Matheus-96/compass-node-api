import { toggleModal, initModal } from "../common/modal.js"

initModal('modal')

var users: Array<Object>
var containerUsers = document.querySelector('.container-users') as HTMLDivElement

//Event listener para quando finalizar carregamento da pagina
window.addEventListener('load', async () => {
    await getUsers()
    updateCards('0')
    updateButtons()

})

document.querySelector('#searchUser')?.addEventListener('click', async () => {
    let name = document.querySelector('#searchInputName') as HTMLInputElement
    let cpf = document.querySelector('#searchInputCPF') as HTMLInputElement
    (name.value == "" && cpf.value == "") ?
        await getUsers() :
        await getUserQuery(name.value, cpf.value);
    
        updateCards('0')
        updateButtons()
})

containerUsers.addEventListener('click', event => {
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
    if (target.classList.contains('delete')) {
        let idInput = document.querySelector('#deleteId') as HTMLInputElement
        let id = idInput.value
        deleteUser(id)
    }
})

document.querySelector('.footer')?.addEventListener('click', (event) => {
    let clickedElement = event.target as HTMLButtonElement
    if (clickedElement.tagName == "BUTTON") {

        let page = clickedElement.dataset.page!

        page = page
        updateCards(page)
        console.log(page);

    }
})

async function deleteUser(id: string) {
    let response = await fetch(`https://compass-node-api.herokuapp.com/api/v1/users/${id}`, { method: 'DELETE' })
    users = await response.json()
}

async function getUsers() {
    let response = await fetch('https://compass-node-api.herokuapp.com/api/v1/users', { method: 'GET' })
    users = await response.json()
}

async function getUserQuery(name: string, cpf: string) {
    let response = await fetch('https://compass-node-api.herokuapp.com/api/v1/queryUsers', {
        method: 'POST',
        body: JSON.stringify({"name": name, "cpf": cpf}),
        headers: new Headers({'Content-Type': 'Application/Json'})
    })
    users = await response.json()
}

async function updateCards(page: string, customUserList: Array<Object> = []) {
    if (customUserList.length > 0){
        users = customUserList
    }

    if (containerUsers) {
        if (users.length > 0){

            containerUsers.innerHTML = ''
            users[page].map(el => {
                containerUsers.innerHTML += createCard(el);
            })
        } else {

            containerUsers.innerHTML = 'Nenhum usuário encontrado'
        }
    }
}

function createCard(user: Object) {
    return `
<div class="card">
                        <div class="div">
                            <label for="">ID</label>
                            <p class="id">
                                ${user['_id']}
                            </p>
                            <label for="">Name</label>
                            <p class="name">
                                ${user['name']}
                            </p>
                            <div class="div"></div>
                            </div>
                            <div class="div">
                            <label for="">E-mail</label>
                            <p class="email">
                                ${user['email']}
                            </p>
                            <label for="">Birth Date</label>
                            <p class="birthDate">
                                ${user['birthDate']}
                            </p>
                        </div>
                        <div class="div">
                            <div class="">
                                <label for="">City</label>
                                <p class="city">
                                    ${user['city']}
                                </p>
                            </div>
                            <div class="">
                                <label for="">State</label>
                                <p class="state">
                                    ${user['state']}
                                </p>
                            </div>
                        </div>
                        <div class="div">
                            <label for="">Address</label>
                            <p class="address">
                                ${user['address']}
                            </p>
                            <label for="">Number</label>
                            <p class="number">
                                ${user['number']}
                            </p>
                        </div>
                    </a>
                    <div class="">
                        <p>
                            <a href='./listUserId.html?id=${user['_id']}'><button class="btn top">Edit</button></a>
                        </p>
                        <p>
                            <button class="btn bottom deleteBtn" data-id='${user['_id']}'>Delete</button>
                        </p>
                    </div>

                </div>`
}

function updateButtons() {
    let footer = document.querySelector('footer')
    if (footer) {
        footer.innerHTML = ''

        for (let x = 0; x < users.length; x++) {
            let b = document.createElement('button') as HTMLButtonElement
            b.dataset.page = x + ""
            b.textContent = (x + 1) + ""
            footer.append(b)

        }
    }
}



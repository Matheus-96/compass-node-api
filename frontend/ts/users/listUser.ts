var users: Array<Object>
var containerUsers = document.querySelector('.container-users') as HTMLDivElement

//Event listener para quando finalizar carregamento da pagina
window.addEventListener('load', async () => {
    await getUsers()
    updateCards('0')
    updateButtons()

})

document.querySelector('.footer')?.addEventListener('click', (event)=> {
    let clickedElement = event.target as HTMLButtonElement
    if(clickedElement.tagName == "BUTTON"){
        
        let page = clickedElement.dataset.page!

        page = page
        updateCards(page)
        console.log(page);
        
    }
})

async function getUsers() {
    let response = await fetch('http://127.0.0.1:3000/api/v1/users', {method: 'GET'})
    users = await response.json()
}

async function updateCards(page: string) {
    if(containerUsers){
        containerUsers.innerHTML = ''
        users[page].map(el => {
            containerUsers.innerHTML += createCard(el);
        })
    }
}

function createCard(user: Object){
return `
<a href='./listUserId.html?id=${user['_id']}'
    <div class="card">
    <div class="">
        <label for="">Name</label>
        <p class="name">
            ${user['name']}
        </p>
        <div class="div"></div>
        <label for="">E-mail</label>
        <p class="email">
        ${user['email']}
        </p>
    </div>
    <div class="">
        <label for="">Birth Date</label>
        <p class="birthDate">
        ${user['birthDate']}
        </p>
    </div>
    <div class="">
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
    <div class="">
        <label for="">Address</label>
        <p class="address">
        ${user['address']}
        </p>
        <label for="">Number</label>
        <p class="number">
        ${user['number']}
        </p>
    </div>

</div>
</a>`
}

function updateButtons() {
    let footer = document.querySelector('footer')
    if(footer){
        footer.innerHTML = ''
                
        for (let x = 0; x < users.length; x++) {
            let b = document.createElement('button') as HTMLButtonElement
            b.dataset.page = x + ""
            b.textContent = (x + 1)+""
            footer.append(b)
            
        }
    }
}
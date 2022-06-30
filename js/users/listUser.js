var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
import { toggleModal, initModal } from "../common/modal.js";
initModal('modal');
var users;
var containerUsers = document.querySelector('.container-users');
//Event listener para quando finalizar carregamento da pagina
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    yield getUsers();
    updateCards('0');
    updateButtons();
}));
(_a = document.querySelector('#searchUser')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    let name = document.querySelector('#searchInputName');
    let cpf = document.querySelector('#searchInputCPF');
    (name.value == "" && cpf.value == "") ?
        yield getUsers() :
        yield getUserQuery(name.value, cpf.value);
    updateCards('0');
    updateButtons();
}));
containerUsers.addEventListener('click', event => {
    let target = event.target;
    if (target.classList.contains('deleteBtn')) {
        let deleteId = document.querySelector('#deleteId');
        let id = target.dataset.id;
        if (id)
            deleteId.value = id;
        toggleModal('modal');
    }
});
(_b = document.querySelector('.modal')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', event => {
    let target = event.target;
    if (target.classList.contains('delete')) {
        let idInput = document.querySelector('#deleteId');
        let id = idInput.value;
        deleteUser(id);
    }
});
(_c = document.querySelector('.footer')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (event) => {
    let clickedElement = event.target;
    if (clickedElement.tagName == "BUTTON") {
        let page = clickedElement.dataset.page;
        page = page;
        updateCards(page);
        console.log(page);
    }
});
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`http://127.0.0.1:3000/api/v1/users/${id}`, { method: 'DELETE' });
        users = yield response.json();
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('http://127.0.0.1:3000/api/v1/users', { method: 'GET' });
        users = yield response.json();
    });
}
function getUserQuery(name, cpf) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('http://127.0.0.1:3000/api/v1/queryUsers', {
            method: 'POST',
            body: JSON.stringify({ "name": name, "cpf": cpf }),
            headers: new Headers({ 'Content-Type': 'Application/Json' })
        });
        users = yield response.json();
    });
}
function updateCards(page, customUserList = []) {
    return __awaiter(this, void 0, void 0, function* () {
        if (customUserList.length > 0) {
            users = customUserList;
        }
        if (containerUsers) {
            if (users.length > 0) {
                containerUsers.innerHTML = '';
                users[page].map(el => {
                    containerUsers.innerHTML += createCard(el);
                });
            }
            else {
                containerUsers.innerHTML = 'Nenhum usuário encontrado';
            }
        }
    });
}
function createCard(user) {
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

                </div>`;
}
function updateButtons() {
    let footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = '';
        for (let x = 0; x < users.length; x++) {
            let b = document.createElement('button');
            b.dataset.page = x + "";
            b.textContent = (x + 1) + "";
            footer.append(b);
        }
    }
}
//# sourceMappingURL=listUser.js.map
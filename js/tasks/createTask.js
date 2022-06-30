var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toggleModal, initModal } from '../common/modal.js';
initModal('modal');
initModal('searchUserModal');
window.addEventListener('load', () => {
    let searchUser = document.querySelector('#searchUser');
    if (searchUser) {
        searchUser.addEventListener('click', openSearchUserModal);
    }
    let userList = document.querySelector('.user-list-ul');
    if (userList) {
        userList.addEventListener(`click`, (event) => {
            let target = event.target;
            if (target.tagName == 'LI') {
                target.classList.add('selected');
                let input = document.querySelector('#user');
                input.value = target.dataset.id;
                let inputName = document.querySelector('#id_name');
                inputName.value = target.textContent;
                toggleModal(`searchUserModal`);
            }
        });
    }
});
function openSearchUserModal() {
    return __awaiter(this, void 0, void 0, function* () {
        let userList = document.querySelector('.user-list-ul');
        if (userList) {
            toggleModal('searchUserModal');
            userList.innerHTML = '';
            let users = Array.from(yield getUsers());
            users.map((page) => {
                page.map(user => {
                    let li = document.createElement(`li`);
                    li.textContent = user['name'];
                    li.dataset.id = user[`_id`];
                    userList === null || userList === void 0 ? void 0 : userList.append(li);
                });
            });
        }
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('https://compass-node-api.herokuapp.com/api/v1/users', { method: 'GET' });
        return yield response.json();
    });
}
//Evento de submit do formulário POST TASK
let form = document.querySelector("#formCreateTask");
if (form)
    form.addEventListener('submit', (event) => createTask(event));
//Chamar API e criar task
const createTask = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    let response = yield createRequest(event.currentTarget);
    let json = yield response['json']();
    let statusCode = response['status'];
    if (statusCode == 400)
        showErrors(json['message']);
    else if (statusCode == 201) {
        toggleModal('modal');
    }
});
function createRequest(form) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = new FormData(form);
        let request = yield fetch('https://compass-node-api.herokuapp.com/api/v1/tasks/', {
            method: 'POST',
            body: ObterFormJSON(data),
            headers: new Headers({
                'Content-Type': 'Application/Json'
            })
        });
        return request;
    });
}
function showErrors(errors) {
    errors.map((el) => {
        var _a, _b;
        let element = document.querySelector(`#${el}`);
        if (element)
            element.classList.add('error');
        (_b = (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector('small')) === null || _b === void 0 ? void 0 : _b.classList.add('visible');
    });
}
function refreshFields() {
}
function ObterFormJSON(form) {
    var object = {};
    form.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);
    return json;
}
//# sourceMappingURL=createTask.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
import { toggleModal, initModal } from '../common/modal.js';
initModal('modal');
var id;
initModal('searchUserModal');
window.addEventListener('load', () => {
});
function openSearchUserModal(event) {
    return __awaiter(this, void 0, void 0, function* () {
        if (event.target.dataset.enabled == 'true') {
            let userList = document.querySelector('.user-list-ul');
            if (userList) {
                userList.innerHTML = '';
                toggleModal('searchUserModal');
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
        }
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('https://compass-node-api.herokuapp.com/api/v1/users', { method: 'GET' });
        return yield response.json();
    });
}
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    let userList = document.querySelector('.user-list-ul');
    if (userList) {
        userList.innerHTML = '';
        userList.addEventListener(`click`, (event) => {
            let target = event.target;
            if (target.tagName == 'LI') {
                console.log("LI");
                target.classList.add('selected');
                let input = document.querySelector('#user');
                input.value = target.dataset.id;
                let inputName = document.querySelector('#id_name');
                inputName.value = target.textContent;
                toggleModal(`searchUserModal`);
            }
        });
    }
    let params = new URLSearchParams(window.location.search);
    id = params.get('id');
    let task;
    if (id) {
        task = yield getTask(id);
        task = yield task['json']();
        fillInputs(task);
        canEdit(false);
    }
    let searchUser = document.querySelector('#searchUser');
    if (searchUser) {
        searchUser.addEventListener('click', (event) => openSearchUserModal(event));
    }
}));
(_a = document.querySelector('#editBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    canEdit(true);
});
(_b = document.querySelector("#formEditTask")) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (event) => updateTask(event));
function getTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(`https://compass-node-api.herokuapp.com/api/v1/tasks/${id}`);
    });
}
function fillInputs(task) {
    let arrFields = getFormFields();
    arrFields === null || arrFields === void 0 ? void 0 : arrFields.map(e => {
        if (e.id == "date") {
            let date = new Date(task['date']);
            e['value'] = `${date.getFullYear()}-${date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() + 1} ${date.getHours()}:${date.getMinutes()}`;
            return;
        }
        else if (e.id == "user") {
            e['value'] = task['user']['_id'];
            return;
        }
        else if (e.id == "id_name") {
            e['value'] = task['user']['name'];
            return;
        }
        e['value'] = task[e.id];
    });
}
function getFormFields() {
    let fields = document.querySelector('form');
    let arrFields;
    if (fields) {
        return Array.from(fields);
    }
    return null;
}
function canEdit(val) {
    let arr = getFormFields();
    arr === null || arr === void 0 ? void 0 : arr.forEach(e => {
        if (e.name == 'id_name')
            return;
        e.disabled = !val;
    });
    let svg = document.querySelector('#searchUser');
    svg.dataset.enabled = val + '';
}
//Chamar API e criar task
const updateTask = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    let response = yield createRequest(event.currentTarget);
    let json = yield response['json']();
    let statusCode = response['status'];
    console.log(statusCode);
    if (statusCode == 400)
        showErrors(json['message']);
    else if (statusCode == 200) {
        toggleModal('modal');
    }
});
function createRequest(form) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = new FormData(form);
        let request = yield fetch(`https://compass-node-api.herokuapp.com/api/v1/tasks/${id}`, {
            method: 'PUT',
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
function ObterFormJSON(form) {
    var object = {};
    form.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);
    return json;
}
//# sourceMappingURL=editTask.js.map
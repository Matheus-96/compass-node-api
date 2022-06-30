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
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    let params = new URLSearchParams(window.location.search);
    id = params.get('id');
    let user;
    if (id) {
        user = yield getUser(id);
        user = yield user['json']();
        fillInputs(user);
        canEdit(false);
    }
}));
(_a = document.querySelector('#editBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    canEdit(true);
});
(_b = document.querySelector("#formEditUser")) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (event) => updateUser(event));
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(`https://compass-node-api.herokuapp.com/api/v1/users/${id}`);
    });
}
function fillInputs(user) {
    let arrFields = getFormFields();
    arrFields === null || arrFields === void 0 ? void 0 : arrFields.map(e => {
        if (e.id == "birthDate") {
            let date = new Date(user['birthDate']);
            e['value'] = `${date.getFullYear()}-${date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() + 1}`;
            return;
        }
        e['value'] = user[e.id];
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
    arr === null || arr === void 0 ? void 0 : arr.forEach(e => e.disabled = !val);
}
//Chamar API e criar usuário
const updateUser = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
        let request = yield fetch(`https://compass-node-api.herokuapp.com/api/v1/users/${id}`, {
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
//# sourceMappingURL=editUser.js.map
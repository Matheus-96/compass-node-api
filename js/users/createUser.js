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
//Evento de submit do formulário POST USER
let form = document.querySelector("#formCreateUser");
if (form)
    form.addEventListener('submit', (event) => createUser(event));
//Chamar API e criar usuário
const createUser = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
        let request = yield fetch('https://compass-node-api.herokuapp.com/api/v1/users/', {
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
//# sourceMappingURL=createUser.js.map
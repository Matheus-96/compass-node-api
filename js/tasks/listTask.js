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
import { initModal, toggleModal } from "../common/modal.js";
var tasks;
var containerTasks = document.querySelector('.container-tasks');
//Event listener para quando finalizar carregamento da pagina
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    yield getTasks();
    updateTaskCards('0');
    updateTaskButtons();
    initModal('modal');
}));
(_a = document.querySelector('.footer')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
    let clickedElement = event.target;
    if (clickedElement.tagName == "BUTTON") {
        let page = clickedElement.dataset.page;
        updateTaskCards(page);
    }
});
containerTasks.addEventListener('click', event => {
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
        deleteTask(id);
    }
});
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('https://compass-node-api.herokuapp.com/api/v1/tasks', { method: 'GET' });
        tasks = yield response.json();
        console.log(tasks);
    });
}
function updateTaskCards(page) {
    return __awaiter(this, void 0, void 0, function* () {
        if (containerTasks) {
            containerTasks.innerHTML = '';
            console.log(tasks);
            tasks[page].map(el => {
                containerTasks.innerHTML += createTaskCard(el);
            });
        }
    });
}
function createTaskCard(task) {
    return `

    <div class="card">
    <div class="">
        <label for="">Description</label>
        <p class="description">
            ${task['description']}
        </p>
        <div class="div"></div>
        <label for="">User</label>
        <p class="user">
        ${task['user'] ? task['user']['name'] : 'Removed User'}
        </p>
    </div>
    <div class="">
        <label for="">Task Date</label>
        <p class="date">
        ${task['date']}
        </p>
    </div>
<div class="">
<p>
    <a href='./listTaskId.html?id=${task['_id']}'><button class="btn top">Edit</button></a>
</p>
<p>
    <button class="btn bottom deleteBtn" data-id='${task['_id']}'>Delete</button>
</p>
</div>
</div>

`;
}
function deleteTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`https://compass-node-api.herokuapp.com/api/v1/tasks/${id}`, { method: 'DELETE' });
        tasks = yield response.json();
    });
}
function updateTaskButtons() {
    let footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = '';
        console.log(tasks.length);
        for (let x = 0; x < tasks.length; x++) {
            let b = document.createElement('button');
            b.dataset.page = x + "";
            b.textContent = (x + 1) + "";
            footer.append(b);
        }
    }
}
//# sourceMappingURL=listTask.js.map
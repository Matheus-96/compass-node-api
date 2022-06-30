export function toggleModal(id) {
    let modal = document.querySelector(`#${id}`);
    let state = modal.dataset.active;
    modal.dataset.active = !state + '';
    if (state) {
        modal.classList.toggle('invisible');
    }
}
export function initModal(id) {
    let modal = document.querySelector(`#${id}`);
    modal.addEventListener('click', (event) => {
        let target = event.target;
        let modal = event.currentTarget;
        if (target.classList.contains('close'))
            modal.classList.add('invisible');
    });
}
//# sourceMappingURL=modal.js.map
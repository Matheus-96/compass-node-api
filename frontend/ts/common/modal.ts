
export function toggleModal(id: string) {
    let modal = document.querySelector(`#${id}`) as HTMLDivElement
    let state = modal.dataset.active
    modal.dataset.active = !state + ''
    if(state){
        modal.classList.toggle('invisible')
    }
}

export function initModal(id: string){
    let modal = document.querySelector(`#${id}`) as HTMLDivElement
    modal.addEventListener('click', (event) => {
        let target = event.target as HTMLElement
        let modal = event.currentTarget as HTMLDivElement
        if(target.classList.contains('close'))
            modal.classList.add('invisible')
    })
}
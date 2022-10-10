// Взаимодействие с сервером

const getTodoList = () => {
    return fetch('http://localhost:3001/api/v1/todo')
    .then(response => response.json())
}

const creatingTodo = (data) => {
    return fetch('http://localhost:3001/api/v1/todo', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
}

const doneTodo = (id) => {
    return fetch('http://localhost:3001/api/v1/todo/' + id,{
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({isDone: true})
    })
}

const updoneTodo = (id) => {
    return fetch('http://localhost:3001/api/v1/todo/' + id,{
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({isDone: false})
    })
}

const deleteTodo = (id) => {
    return fetch('http://localhost:3001/api/v1/todo/' + id,{
        method: 'DELETE'
    })
}

let ArrayLS = [];

displayCases();


// Открытие модального окна

const buttonPlus = document.querySelector('.button_style');
const modalBlock = document.createElement('div');
modalBlock.className='modal';
modalBlock.innerHTML=`
    <div class="modal-overlay">
        <div class="modal-window">
            <div class="modal-header">
                <p class="modal-header-titel">НОВОЕ ДЕЛО</p>
                <p class="modal-header-close">&#10060;</p>
            </div>
            <div class="modal-base">
                <div class="modal-base-name">
                    <textarea class="modal-name-textarea" id="modal-height" placeholder="Название дела"></textarea>
                </div>
                <div class="modal-base-text">
                    <textarea class="modal-text-textarea" id="modal-height" placeholder="Введите, то что необходимо сделать..."></textarea>
                </div>
            </div>
            <div class="modal-action">
                <button>Добавить</button>
            </div>
        </div>
    </div>
    `;

buttonPlus.addEventListener('click', function newToDo() {
    document.body.append(modalBlock);
    let textareaModal = document.querySelectorAll('#modal-height');
    
    textareaModal.forEach(elem =>{
        elem.addEventListener("keyup", e => {
            elem.style.height = "20px";
            if (elem.scrollHeight > 30) {
                elem.style.height = elem.scrollHeight - 10 + 'px';
            };
        });
    }); 

    // Закрытие модального окна
    const buttonClose = document.querySelector('.modal-header-close');
    buttonClose.addEventListener('click', function closeModalWindow() {
        if (document.querySelector('.modal-name-textarea').value) {
            document.querySelector('.modal-name-textarea').value = ''
        }
        if (document.querySelector('.modal-text-textarea').value) {
            document.querySelector('.modal-text-textarea').value = ''
        }
        document.querySelector('.modal-name-textarea').placeholder = 'Название дела';
        document.querySelector('.modal-text-textarea').placeholder = 'Введите, то что необходимо сделать...';
        document.querySelector('.modal-name-textarea').style.setProperty("--c", "rgba(118, 118, 118)");
        document.querySelector('.modal-text-textarea').style.setProperty("--c", "rgba(118, 118, 118)");
        buttonClose.removeEventListener('click', closeModalWindow);
        document.querySelector('.modal').remove();
    })

    // Добавить Новое дело
    const buttonAdd = document.querySelector('.modal-action');
    buttonAdd.addEventListener('click', function AddingNewCase() {
        let valid = true;
        let modalName = document.querySelector('.modal-name-textarea');
        if (modalName.value == '') {
            modalName.placeholder = 'Название дела должно быть не равно нулю!';
            modalName.style.setProperty("--c", "red");
            valid = false;
        } else if (document.querySelector('.modal-text-textarea').value == ''){
            document.querySelector('.modal-text-textarea').placeholder = 'Эта строка не должна оставаться пустой!';
            document.querySelector('.modal-text-textarea').style.setProperty("--c", "red");
            valid = false;
        } else {
            for (let v = 0; v < (ArrayLS.length); v++) {
                if (modalName.value == ArrayLS[v].title) {
                    modalName.value = '';
                    modalName.placeholder = 'Название дела должно быть уникальным!';
                    modalName.style.setProperty("--c", "red");
                    valid = false;
                    break;
                } else {
                    valid = true;
                }
            }
        }
        if (valid == true) {
            caseStringAction();
            getTodoList().then(data => ArrayLS = data);
            console.log(ArrayLS);
            cleanerCases();
            displayCases();
            document.querySelector('.modal-name-textarea').placeholder = 'Название дела';
            document.querySelector('.modal-text-textarea').placeholder = 'Введите, то что необходимо сделать...';
            document.querySelector('.modal-name-textarea').style.setProperty("--c", "rgba(118, 118, 118)");
            document.querySelector('.modal-text-textarea').style.setProperty("--c", "rgba(118, 118, 118)");
            modalName.value = ''; 
            document.querySelector('.modal-text-textarea').value = '';
            buttonAdd.removeEventListener('click', AddingNewCase);
            document.querySelector('.modal').remove();
        }
    })
})

let caseStringAction = function() {
    ArrayLS.push({
        title: document.querySelector('.modal-name-textarea').value, 
        description: document.querySelector('.modal-text-textarea').value
    });
    creatingTodo({
        title: document.querySelector('.modal-name-textarea').value, 
        description: document.querySelector('.modal-text-textarea').value
    });
}

//Отображение Cases на главной странице
async function displayCases () {
    await getTodoList().then(data => {ArrayLS = data})

    if (ArrayLS.length !== 0) {
        document.getElementById('start_case').style.display = 'none';
    } else {
        document.getElementById('start_case').style.display = 'flex';
    }

    console.log(ArrayLS)
    for (let i = 0; i < ArrayLS.length; i++) {
        let caseString = document.createElement('ul');
        caseString.className='shadow_item';
        caseString.id="number"+i;
        caseString.innerHTML=`
        <li class="first_column">
            <div class="shadow_item_first">
                <p class="case-name-p"></p>
                <p class="case-contant-p"></p>
            </div>
        </li>
        <li class="second_column">
            <input type='checkbox' class="shadow_item_second" id="input_chechbox${i}"></input>
            <label for="input_chechbox${i}" class="checkbox_style"></label>
            <button class="shadow_case_close">&#10060;</button>
        </li>
        `;
        document.querySelector('.shadow').append(caseString);
        document.querySelectorAll('.case-name-p')[i].textContent = ArrayLS[i].title;
        document.querySelectorAll('.case-contant-p')[i].textContent = ArrayLS[i].description;
        if (ArrayLS[i].isDone == true) {
            document.querySelectorAll('.shadow_item_second')[i].checked = true;
        }
    }
    document.querySelectorAll('p').forEach(elem =>{
        if (elem.scrollHeight > 30) {
            elem.style.height = elem.scrollHeight - 6 + 'px';
        }
    })

    //Сохранение значения Input Checkbox

    let checkboxDone = document.querySelectorAll('.shadow_item_second')
    for (let q = 0; q < checkboxDone.length; q++) {
        checkboxDone[q].addEventListener('click', async function AddCheckboxArray() {
            await getTodoList().then(data => {ArrayLS = data});
            if (!ArrayLS[q].isDone || ArrayLS[q].isDone == false) {
                ArrayLS[q].isDone = true
                doneTodo(ArrayLS[q].id);
            } else if (ArrayLS[q].isDone == true) {
                ArrayLS[q].isDone = false
                updoneTodo(ArrayLS[q].id);
            }
        });
    }

    //Удаление элемента массива из localStorage

    const deleteButton = document.querySelectorAll('.shadow_case_close');

    for (let s = 0; s < deleteButton.length; s++) {
        deleteButton[s].addEventListener('click', async function deleteCase() {
            await deleteTodo(ArrayLS[s].id);
            ArrayLS.splice(s,1);
            cleanerCases();
            displayCases();
        });
    };
}

function cleanerCases() {
    let pieces = document.querySelectorAll('.shadow_item')
    pieces.forEach (piece => {
        piece.remove();
    })
}
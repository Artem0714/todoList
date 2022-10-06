// Взаимодействие с сервером

const getTodoList = () => {
    return fetch('http://localhost:3001/api/v1/todo')
    .then(response => response.json())
}

// const getItemList = (id) => {
//     fetch('http://localhost:3001/api/v1/todo' + id)
//     .then((response) => response.json())
// }

const creatingTodo = (data) => {
    return fetch('http://localhost:3001/api/v1/todo', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
}

const changeTodo = (id) => {
    return fetch('http://localhost:3001/api/v1/todo/' + id,{
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({isDone: true})
    })
}

const deleteChangeTodo = (id) => {
    return fetch('http://localhost:3001/api/v1/todo/' + id + '.isDone',{
        method: 'DELETE',
    })
}

const deleteTodo = (id) => {
    return fetch('http://localhost:3001/api/v1/todo/' + id,{
        method: 'DELETE'
    })
}

let ArrayLS = [];

getTodoList()
    .then(data => {
    ArrayLS = data;
    if (ArrayLS.length !== 0) {
        document.getElementById('start_case').style.display = 'none';
    }

    displayCases();
});




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
        document.querySelector('.modal-name-textarea').value = ''; 
        document.querySelector('.modal-text-textarea').value = '';
        document.querySelector('.modal').remove();
        buttonClose.removeEventListener('click', closeModalWindow);
    })

    // Добавить Новое дело
    const buttonAdd = document.querySelector('.modal-action');
    buttonAdd.addEventListener('click', function AddingNewCase() {
        let valid = true;
        let modalName = document.querySelector('.modal-name-textarea');
        if (modalName.value == '') {
            modalName.placeholder = 'Название дела должно быть не равно нулю!';
            document.querySelector('.modal-name-textarea').style.setProperty("--c", "red");
            valid = false;
        } else {
            for (let v = 0; v < (ArrayLS.length); v++) {
                if (modalName.value == ArrayLS[v].title) {
                    modalName.value = '';
                    modalName.placeholder = 'Название дела должно быть уникальным!';
                    document.querySelector('.modal-name-textarea').style.setProperty("--c", "red");
                    valid = false;
                    break;
                } else {
                    valid = true;
                }
            }
        }
        if (valid == true) {
            console.log(ArrayLS);
            caseStringAction();
            cleanerCases();
            displayCases();
            modalName.placeholder = "Название дела";
            modalName.value = ''; 
            document.querySelector('.modal-text-textarea').value = '';
            buttonAdd.removeEventListener('click', AddingNewCase);
            document.querySelector('.modal').remove();
        }
    })
})

//Сохранение в localStorage

// let ArrayLS = [];
// getTodoList();

// if (ArrayLS.length !== 0) {
//     document.getElementById('start_case').style.display = 'none';
// }

let caseStringAction = function() {
    ArrayLS.push({
        title: document.querySelector('.modal-name-textarea').value, 
        description: document.querySelector('.modal-text-textarea').value
    });
    console.log(ArrayLS);
    creatingTodo({
        title: document.querySelector('.modal-name-textarea').value, 
        description: document.querySelector('.modal-text-textarea').value
    }); /*localStorage.setItem('cases', JSON.stringify(ArrayLS))*/
    cleanerCases();
    displayCases();
};

//Отображение Cases на главной странице
function displayCases () {
    // const response = await request('http://localhost:3001/api/v1/todo', 'GET', ArrayLS)
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
        if (ArrayLS[i].isDone) {
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
        checkboxDone[q].addEventListener('click', function AddCheckboxArray() {
            console.log(checkboxDone[q].checked && ArrayLS[q].isDone == false);
            if (checkboxDone[q].checked && ArrayLS[q].isDone == false) {
                ArrayLS[q].isDone = true
                changeTodo(ArrayLS[q].id);/*localStorage.setItem('cases', JSON.stringify(ArrayLS))*/
                cleanerCases();
                displayCases();
            } else if (ArrayLS[q].isDone == true) {
                delete ArrayLS[q].isDone;
                deleteChangeTodo(ArrayLS[q].id);/*localStorage.setItem('cases', JSON.stringify(ArrayLS))*/
                cleanerCases();
                displayCases();
            }
        });
    };

    //Удаление элемента массива из localStorage

    const deleteButton = document.querySelectorAll('.shadow_case_close');

    for (let s = 0; s < deleteButton.length; s++) {
        deleteButton[s].addEventListener('click', function deleteCase() {
            ArrayLS.splice(s,1);
            deleteTodo(s); /*localStorage.setItem('cases', JSON.stringify(ArrayLS))*/
            cleanerCases();
            displayCases();
        });
    };
};

displayCases();

function cleanerCases() {
    let pieces = document.querySelectorAll('.shadow_item')
    pieces.forEach (piece => {
        piece.remove();
    });
};
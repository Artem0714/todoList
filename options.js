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
                if (modalName.value == ArrayLS[v][0]) {
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
            caseStringAction ();
            modalName.placeholder = "Название дела";
            modalName.value = ''; 
            document.querySelector('.modal-text-textarea').value = '';
            buttonAdd.removeEventListener('click', AddingNewCase);
            document.querySelector('.modal').remove();
        }
    })
})

//Сохранение в localStorage
let ArrayLS =[];

if (JSON.parse(localStorage.getItem('cases')) && JSON.parse(localStorage.getItem('cases')).length !== 0) {
    ArrayLS = JSON.parse(localStorage.getItem('cases'));
    document.getElementById('start_case').style.display = 'none';
}

let caseStringAction = function() {
    ArrayLS.push([
        document.querySelector('.modal-name-textarea').value, 
        document.querySelector('.modal-text-textarea').value
    ]);
    localStorage.setItem('cases', JSON.stringify(ArrayLS));
    cleanerCases();
    displayCases();
};

//Отображение Cases на главной странице
function displayCases () {
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

        document.querySelectorAll('.case-name-p')[i].textContent = ArrayLS[i][0];
        document.querySelectorAll('.case-contant-p')[i].textContent = ArrayLS[i][1];
        if (ArrayLS[i][2]) {
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
            if (checkboxDone[q].checked && ArrayLS[q][2] == null) {
                ArrayLS[q].push('1');
                localStorage.setItem('cases', JSON.stringify(ArrayLS));
                cleanerCases();
                displayCases();
            } else if (ArrayLS[q][2] == '1') {
                ArrayLS[q].splice(2,1);
                localStorage.setItem('cases', JSON.stringify(ArrayLS));
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
            localStorage.setItem('cases', JSON.stringify(ArrayLS));
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
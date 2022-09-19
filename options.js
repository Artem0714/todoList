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
                    <textarea class="modal-name-textarea" placeholder="Название дела"></textarea>
                </div>
                <div class="modal-base-text">
                    <textarea class="modal-text-textarea" placeholder="Введите, то что необходимо сделать..."></textarea>
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

    // Закрытие модального окна
    const buttonClose = document.querySelector('.modal-header-close');
    buttonClose.addEventListener('click', function closeModalWindow() {
        document.querySelector('.modal').remove();
    }, {
        passive: true,
        once: true
    });

    // Добавить Новое дело
    const buttonAdd = document.querySelector('.modal-action');
    buttonAdd.addEventListener('click', function AddingNewCase() {
        caseStringAction ();
        document.querySelector('.modal').remove();
    }, {
        passive: true,
        once: true
    });
});


//Сохранение в localStorage и проецирование Cases на главную страницу
let ArrayLS =[];

if (JSON.parse(localStorage.getItem('cases'))) {
    ArrayLS =JSON.parse(localStorage.getItem('cases'));
};

if (ArrayLS[0] != null) {
    document.getElementById('start_case').remove();    
};

let caseStringAction = function() {
    ArrayLS.push([document.querySelector('.modal-name-textarea').value, document.querySelector('.modal-text-textarea').value]);
    localStorage.setItem('cases', JSON.stringify(ArrayLS));
    location.reload();
};

for (let i = 0; i < ArrayLS.length; i++) {
    let caseString = document.createElement('ul');
    caseString.className='shadow_item';
    caseString.innerHTML=`
    <li class="first_column">
        <div class="shadow_item_first">
            <textarea class="case-name-textarea"></textarea>
            <textarea class="case-contant-textarea"></textarea>
        </div>
    </li>
    <li class="second_column">
        <input type='checkbox' class="shadow_item_second" id="input_chechbox"></input>
        <label for="input_chechbox" class="checkbox_style"></label>
    </li>
    `;
    document.querySelector('.shadow').append(caseString);
};

const nameCase =  document.querySelectorAll('.case-name-textarea');
const contantCase = document.querySelectorAll('.case-contant-textarea');

for (let k = 0; k < nameCase.length; k++) {
    nameCase[k].value = JSON.parse(localStorage.getItem('cases'))[k][0];
    contantCase[k].value = JSON.parse(localStorage.getItem('cases'))[k][1];
};

//Удаление элемента массива из localStorage

// let h = 1;
// function deleteCase () {
//     ArrayLS.splice(h,1);
//     console.log(ArrayLS)
// };

// deleteCase()





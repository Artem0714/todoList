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

const p = document.querySelectorAll('p')

p.forEach(elem =>{
    if (elem.scrollHeight > 30) {
        elem.style.height = elem.scrollHeight - 6 + 'px';
    };
});

//Сохранение в localStorage
let ArrayLS =[];

if (JSON.parse(localStorage.getItem('cases'))) {
    ArrayLS =JSON.parse(localStorage.getItem('cases'));
};

if (ArrayLS[0] != null) {
    document.getElementById('start_case').remove();    
};

let caseStringAction = function() {
    ArrayLS.push([
        document.querySelector('.modal-name-textarea').value, 
        document.querySelector('.modal-text-textarea').value
    ]);
    localStorage.setItem('cases', JSON.stringify(ArrayLS));
    if (document.getElementById('start_case') && ArrayLS[0]) {  
        document.getElementById('start_case').remove();
    };
    displayCase(ArrayLS.length-1);
};

//Отображение Cases на главной странице
function displayCase (i) {
    let caseString = document.createElement('ul');
    caseString.className='shadow_item';
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
};

for (let i = 0; i < ArrayLS.length; i++) {
    displayCase (i);
};

const nameCase =  document.querySelectorAll('.case-name-p');
const contantCase = document.querySelectorAll('.case-contant-p');

for (let k = 0; k < nameCase.length; k++) {
    nameCase[k].textContent = JSON.parse(localStorage.getItem('cases'))[k][0];
    contantCase[k].textContent = JSON.parse(localStorage.getItem('cases'))[k][1];
};

//Удаление элемента массива из localStorage

let deleteButton = document.querySelectorAll('.shadow_case_close');

for (let s = 0; s < deleteButton.length; s++) {
    deleteButton[s].addEventListener('click', function deleteCase() {
        ArrayLS.splice(s,1);
        localStorage.setItem('cases', JSON.stringify(ArrayLS));
        if (document.getElementById('start_case') && ArrayLS[0]) {  
            document.getElementById('start_case').remove();
        };
        // console.log(ArrayLS.length);
    }, {
        passive: true,
        once: true
    });
    
    // displayCase(ArrayLS.length-1);
};

// let h = 1;
// function deleteCase () {
//     ArrayLS.splice(h,1);
//     console.log(ArrayLS)
// };

// deleteCase()






// let inputCheck = document.querySelectorAll('.shadow_item_second').checked;

// inputCheck.forEach(elem, e => {
//     if(elem) {
//         console.log(e);
//     }
// })


// console.log(document.querySelector('.shadow_item_second').checked);




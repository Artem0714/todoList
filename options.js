const AddString = document.querySelectorAll('input')

buttons.forEach(elem => {
    elem.addEventListener('click', function getValue() {
        if (elem.value) {
        } else if (orderMove.motion % 2 != 0 ) {
            elem.value = '○';
            orderMove.motion += 1;
        } else {
            elem.value = '×';
            orderMove.motion += 1;
        };
        checkWinner()
    });
});
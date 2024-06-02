const selectors = document.querySelectorAll('select');
[...selectors].forEach(el => {
    el.addEventListener('change', function(ev) {
        handleSelect(ev, this);
        validate();
    });
});

const numbers = document.querySelectorAll('.number');
[...numbers].forEach(el => {
    el.addEventListener('keyup', function(ev) {
        handleNumber(ev, this);
        validate();
    });
});

const button = document.querySelector('#button-submit');

function validate() {
    const result = checkSelects() && checkNumbers();
    button.disabled = !result;
}

function checkSelects() {
    for (let i = 0; i < selectors.length; i++) {
        if (!selectors[i].value) {
            selectors[i].className = setClass('is-invalid');
            return false; 
        }
    }
    return true;
}

function checkNumbers() {
    for (let i = 0; i < numbers.length; i++) {
        if (!numbers[i].value || Number(numbers[i].value) <= 0) {
            numbers[i].className = setClass('is-invalid');
            return false;
        }
    } 
    return true;   
}

function handleSelect(ev, that) {
    const value = ev.target.value;
    that.className = value.length === 0 ? setClass('is-invalid') : setClass('is-valid');
}

function handleNumber(ev, that) {
    const notNumber = isNaN(ev.target.value.trim());
    that.className = notNumber ? setClass('is-invalid') : setClass('is-valid');
}

function setClass(value) {
    return `form-control form-control-sm ${value}`;
}
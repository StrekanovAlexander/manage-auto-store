const min = 1;

const title = document.querySelector('#title');
const numbers = document.querySelectorAll('.number');

[...numbers].forEach(el => {
    el.addEventListener('keyup', function(ev) {
        handleNumber(ev, this);
        validate();
    });
})

const button = document.querySelector('#button-submit');

let isValidNumbers = true;

title.addEventListener('keyup', function(ev) {
    handle(ev, this);
    validate();
});

function validate() {

    button.disabled = title.value.length < min || !isValidNumbers;
}

function handle(ev, that) {
    const value = ev.target.value.trim();
    that.className = value.length < min ? setClass('is-invalid') : setClass('is-valid');
}

function handleNumber(ev, that) {
    const value = ev.target.value.trim();
    if (value.length > 0) {
        const result = isNaN(value);
        that.className = result ? setClass('is-invalid') : setClass('is-valid');
        isValidNumbers = !result;
    } else {
        that.className = setClass('is-valid');
        isValidNumbers = true;
    }
}

function setClass(value) {
    return `form-control form-control-sm ${value}`;
}
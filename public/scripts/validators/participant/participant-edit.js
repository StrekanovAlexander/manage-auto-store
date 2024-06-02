const min = 3;

const fullName = document.querySelector('#full_name');
const button = document.querySelector('#button-submit');

fullName.addEventListener('keyup', function(ev) {
    handle(ev, this);
    validate();
});

function validate() {
    button.disabled = fullName.value.length < min;
}

function handle(ev, that) {
    const value = ev.target.value;
    that.className = value.length < min ? setClass('is-invalid') : setClass('is-valid');
}

function setClass(value) {
    return `form-control form-control-sm ${value}`;
}
const btnModalEdits = document.querySelectorAll('.btn-modal-edit');
if (btnModalEdits) {
    btnModalEdits.forEach(btn => {
        btn.addEventListener('click', (ev) => {
            const id = ev.target.dataset.btnModalId;
            const cells = document.querySelector(`#row-id-${ id }`).getElementsByTagName('td');
            const form = document.querySelector('#form-edit');
            form.action = '/operations/edit';

            form.querySelector('#date_reg').value = cells[1].innerText;

            [...document.querySelector('#customer_id').getElementsByTagName('option')].forEach(el => {
                if (cells[2].innerText === el.label) {
                    el.defaultSelected = true;
                }
            });

            [...document.querySelector('#participant_id').getElementsByTagName('option')].forEach(el => {
                if (cells[3].innerText === el.label) {
                    el.defaultSelected = true;
                }
            });

            [...document.querySelector('#operation_type_id').getElementsByTagName('option')].forEach(el => {
                if (cells[4].innerText === el.label) {
                    el.defaultSelected = true;
                }
            }); 

            [...document.querySelector('#payment_type_id').getElementsByTagName('option')].forEach(el => {
                if (cells[5].innerText === el.label) {
                    el.defaultSelected = true;
                }
            }); 

            form.querySelector('#amount').value = cells[6].innerText;
            form.querySelector('#description').value = cells[7].innerText;

            const hiddenId = form.querySelector('#hidden-id');
            hiddenId.value = id;
            hiddenId.name = 'id';
        
            form.querySelector('#button-submit').disabled = false;
        });
    });
}

document.querySelector('#btn-modal').addEventListener('click', (ev) => {
    const form = document.querySelector('#form-edit');
    form.action = '/operations/create';
    const hiddenId = form.querySelector('#hidden-id');
    hiddenId.value = '';
    hiddenId.name = 'id';
        
    form.querySelector('#button-submit').disabled = true;
});

const btnModalRemoves = document.querySelectorAll('.btn-modal-remove');
const formRemove = document.querySelector('#form-remove');
if (btnModalRemoves) {
    btnModalRemoves.forEach(btn => {
        btn.addEventListener('click', (ev) => {
            
            const id = ev.target.dataset.btnModalId;
            const cells = document.querySelector(`#row-id-${ id }`).getElementsByTagName('td');
            document.querySelector('#rm-id').innerHTML = id;
            document.querySelector('#rm-date-reg').innerHTML = cells[1].innerText;
            document.querySelector('#rm-customer').innerHTML = cells[2].innerText;
            document.querySelector('#rm-participant').innerHTML = cells[3].innerText;
            document.querySelector('#rm-operation-type').innerHTML = cells[4].innerText;
            document.querySelector('#rm-payment-type').innerHTML = cells[5].innerText;
            document.querySelector('#rm-amount').innerHTML = cells[6].innerText;
            document.querySelector('#rm-description').innerHTML = cells[7].innerText;
            formRemove.querySelector('#hidden-rm-id').value = id;
        });
    });
}

document.querySelector('#rm-check-box').addEventListener('change', function(ev) {
    document.querySelector('#btn-rm-submit').disabled = !this.checked;
})
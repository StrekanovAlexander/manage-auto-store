(() => {

    document.querySelector('#btn-specifications').addEventListener('click', (ev) => {
        const el = document.querySelector('#specifications');
        toggleVisibility(el);
        ev.target.text = el.classList.contains('visible') ? 'Hide specifications' : 'Show specifications';
    });

    document.querySelector('#button-submit').addEventListener('click', (ev) => {
        const el = document.querySelector('#create-operation');
        el.classList.remove('visible');
        el.classList.add('hidden');
        ev.target.text = el.classList.contains('visible') ? 'Close form' : 'Create operation';
    });

    function toggleVisibility(el) {
        if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
            el.classList.add('visible');
        } else if (el.classList.contains('visible')) {
            el.classList.remove('visible');
            el.classList.add('hidden');
        }
    }

    const btnCosts = document.querySelectorAll('.btn-edit-cost');
    if (btnCosts) {
        document.querySelectorAll('.btn-edit-cost').forEach(btn => {
            btn.addEventListener('click', (ev) => {
                const id = ev.target.dataset.btnEditCost;
                const row = document.querySelector(`#cost-row-id-${ id }`);
                const cells = row.getElementsByTagName('td');
                const form = document.querySelector('#form-cost-edit');
                form.action = '/operations/edit';
                form.querySelector('#date_reg').value = cells[1].innerText;
                
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

    document.querySelector('#btn-add-cost').addEventListener('click', (ev) => {
        const form = document.querySelector('#form-cost-edit');
        form.action = '/operations/lot/create';
        const hiddenId = form.querySelector('#hidden-id');
        hiddenId.value = ev.target.dataset.lotId;
        hiddenId.name = 'lot_id';
           
        form.querySelector('#button-submit').disabled = true;
    });
})();
(() => {

    document.querySelector('#btn-specifications').addEventListener('click', (ev) => {
        const el = document.querySelector('#specifications');
        toggleVisibility(el);
        ev.target.text = el.classList.contains('visible') ? 'Hide specifications' : 'Show specifications';
    });

    document.querySelector('#btn-create-operation').addEventListener('click', (ev) => {
        const el = document.querySelector('#create-operation');
        toggleVisibility(el);
        ev.target.text = el.classList.contains('visible') ? 'Close form' : 'Create operation';
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
})();
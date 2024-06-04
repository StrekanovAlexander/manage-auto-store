(() => {
    document.querySelector('#brand_id').addEventListener('change', (ev) => {
        const selector = document.querySelector('#model_id');
        selector.innerHTML = '';
        if (!ev.target.value) {
            return;
        }
        (async () => {
            try {
                const res = await fetch(`https://manage-auto-store.glitch.me/brands/${ev.target.value}/models/json`);
                // const res = await fetch(`http://localhost:3000/brands/${ev.target.value}/models/json`);
                const data = await res.json();
                build(selector, data);
            } catch (err) {
                console.log('Wrong request...');
            }
        })();
    });

    function build(selector, data) {
        data.forEach(el => {
            const option = document.createElement('option');
            option.value = el.id;
            option.innerHTML = el.title;
            selector.appendChild(option);
        });
    }
})();
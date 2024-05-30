const home = `<li class="breadcrumb-item">
    <a href="/" class="text-decoration-underline">Операции</a>
</li>`;

const build = (arr = null) => {
    if (!arr) {
        return home;
    }
    return arr.reduce((acc, el, ix) => {
        const item = ix !== arr.length - 1 ?
            `<li class="breadcrumb-item">
                <a href="${el.url}" class="text-decoration-underline">${el.title}</a>
            </li>` :
            `<li class="breadcrumb-item active">${el.title}</li>`;
        acc += item;     
        return acc;
    }, home);
}

const make = (url, title) => {
    return { url, title }
};

export default { build, make }


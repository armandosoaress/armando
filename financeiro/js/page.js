function changeMenuColor(page) {
    const menus = [
        '.menu_init',
        '.menu_organizador',
        '.menu_investimentos',
        '.menu_dividas',
        '.menu_empreendidos',
        '.menu_receita',
    ];
    menus.forEach(menu => {
        document.querySelector(menu).style.backgroundColor = 'transparent';
        const as = document.querySelectorAll(`${menu} a`);
        as.forEach(a => {
            a.style.color = 'white';
        });
    });
    document.querySelector(`.menu_${page}`).style.backgroundColor = 'white';
    const as = document.querySelectorAll(`.menu_${page} a`);
    as.forEach(a => {
        a.style.color = 'black';
    });
}
function showPage(page) {
    localStorage.setItem('pagefinanceiro', page);
    changeMenuColor(page);
    document.querySelectorAll('.pagina').forEach(pagina => {
        pagina.style.display = 'none';
    });
    document.querySelector(`.${page}`).style.display = 'flex';
}

document.querySelectorAll('.pagina').forEach(pagina => {
    pagina.style.display = 'none';
});
document.querySelector('.init').style.display = 'flex';

const page = localStorage.getItem('pagefinanceiro');
if (page) {
    showPage(page);
}
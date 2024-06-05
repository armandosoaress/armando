function showPage(page) {
    if (page == 'organizador') {
        document.querySelector('.menu_organizador').style.backgroundColor = 'white';
        document.querySelector('.menu_init').style.backgroundColor = 'transparent';
    }
    if (page == 'init') {
        document.querySelector('.menu_init').style.backgroundColor = 'white';
        document.querySelector('.menu_organizador').style.backgroundColor = 'transparent';
    }

    document.querySelectorAll('.pagina').forEach(element => {
        element.style.display = 'none';
    });
    document.querySelector('.' + page).style.display = 'flex';
}
document.querySelectorAll('.pagina').forEach(element => {
    element.style.display = 'flex';
});


document.querySelector('.organizador').style.display = 'none';
function deletar(id) {
    fetch('./api/deletar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
    }).then(response => response.json())
        .then(data => {
            if (data.status == 'ok') {
                movimentacoes();
            }
        }).catch(error => {
            console.error('Erro ao deletar movimentação:', error);
        });
}
function pagar(id, status) {
    var mes = document.getElementById('mes').value;
    var ano = document.getElementById('ano').value;
    var dia = new Date().getDate();

    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }
    var data = ano + '-' + mes + '-' + dia;
    if (status == 1) {

        Swal.fire({
            title: 'Data de Pagamento',
            html: `
            <input type="date" id="pagamento"  class="swal2-input" value="${data}">
            `,
            showCancelButton: true,
            confirmButtonText: 'Pagar',
            preConfirm: () => {
                const pagamento = Swal.getPopup().querySelector('#pagamento').value
                return { pagamento: pagamento }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const pagamento = result.value.pagamento
                const dados = {
                    id: id,
                    status: status,
                    pagamento: pagamento
                }
                fetch('./api/pagar.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id, status: status, pagamento: pagamento }),
                }).then(response => response.json())
                    .then(data => {
                        if (data.status == 'ok') {
                            movimentacoes();
                        }
                    }).catch(error => {
                        console.error('Erro ao pagar movimentação:', error);
                    });
            }
        }
        )
    } else {
        fetch('./api/pagar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, status: status , pagamento: data }),
        }).then(response => response.json())
            .then(data => {
                if (data.status == 'ok') {
                    movimentacoes();
                }
            }).catch(error => {
                console.error('Erro ao pagar movimentação:', error);
            });
    }
}
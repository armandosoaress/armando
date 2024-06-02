async function editar(id) {
    const movimentacao = await listamovimentacao(id)
    var descricaocaterogia = await listacategoria(movimentacao[0].categoria)
    Swal.fire({
        title: 'Editar ' + descricaocaterogia[0].descricao,
        html: `
            <input type="text" id="descricao" class="swal2-input" placeholder="Descrição" value="${movimentacao[0].descricao}">
            <input type="text" id="valor" class="swal2-input" placeholder="Valor" value="${movimentacao[0].valor}" onkeyup="formatarMoeda(this)">
            <label for="data">Data de Vencimento</label>
            <input type="date" class="swal2-input" placeholder="Vencimento" id="vencimento" value="${movimentacao[0].data_vencimento}">
            <p></p>
            <label for="data">Data de Pagamento</label>
            <input type="date" class="swal2-input" placeholder="Pagamento" id="pagamento" value="${movimentacao[0].data_pagamento}">
            <p></p>
            <label for="data">Repetir</label>
            <select class="swal2-input" id="repetir">
                ${movimentacao[0].repetir == 0
                ? `<option value="0" selected>Não repetir</option>
                <option value="1">Repetir mensalmente</option>`
                : `<option value="0">Não repetir</option>
                <option value="1" selected>Repetir mensalmente</option>`}
            </select>
            `,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        preConfirm: () => {
            const descricao = Swal.getPopup().querySelector('#descricao').value
            const valor = Swal.getPopup().querySelector('#valor').value
            const vencimento = Swal.getPopup().querySelector('#vencimento').value
            const pagamento = Swal.getPopup().querySelector('#pagamento').value
            const repetir = Swal.getPopup().querySelector('#repetir').value

            if (!descricao || !valor) {
                Swal.showValidationMessage(`Preencha todos os campos`)
            }
            return { descricao: descricao, valor: valor, vencimento: vencimento, pagamento: pagamento, repetir: repetir }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const descricao = result.value.descricao
            const valor = result.value.valor
            const vencimento = result.value.vencimento
            const pagamento = result.value.pagamento
            const repetir = result.value.repetir
            const dados = {
                id: id,
                descricao: descricao,
                valor: valor,
                vencimento: vencimento,
                pagamento: pagamento,
                repetir: repetir
            }
            atualizar(dados)
        }
    })
}

async function listamovimentacao(id) {
    const response = await fetch('./api/movimentacoes.php?id=' + id);
    const data = await response.json();
    return data;
}

async function atualizar(dados) {
    const response = await fetch('./api/atualiza.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    });
    const data = await response.json();
    movimentacoes()
}
async function adicionar(idcategoria) {
    var descricaocaterogia = await listacategoria(idcategoria)
    Swal.fire({
        title: 'Adicionar ' + descricaocaterogia[0].descricao,
        html: `
            <input type="text" id="descricao" class="swal2-input" placeholder="Descrição">
            <input type="text" id="valor" class="swal2-input" placeholder="Valor" onkeyup="formatarMoeda(this)">
            <label for="data">Data de Vencimento</label>
            <input type="date" class="swal2-input" placeholder="Vencimento" id="vencimento">
            <p></p>
            <label for="data">Data de Pagamento</label>
            <input type="date" class="swal2-input" placeholder="Pagamento" id="pagamento">
            <p></p>
            <label for="data">Repetir</label>
            <select class="swal2-input" id="repetir">
                <option value="0" selected>Não repetir</option>
                <option value="1">Repetir mensalmente</option>
            </select>
            `,
        showCancelButton: true,
        confirmButtonText: 'Adicionar',
        preConfirm: () => {
            const descricao = Swal.getPopup().querySelector('#descricao').value
            const valor = Swal.getPopup().querySelector('#valor').value
            const vencimento = Swal.getPopup().querySelector('#vencimento').value
            const pagamento = Swal.getPopup().querySelector('#pagamento').value
            const repetir = Swal.getPopup().querySelector('#repetir').value

            if (!descricao || !valor) {
                Swal.showValidationMessage(`Preencha todos os campos`)
            }
            
            if (vencimento == '' && pagamento == '') {
                Swal.showValidationMessage(`Preencha a data de vencimento ou a data de pagamento`)
            }
            return { descricao: descricao, valor: valor, vencimento: vencimento, pagamento: pagamento  , repetir: repetir}
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const descricao = result.value.descricao
            const valor = result.value.valor
            const categoria = idcategoria
            const vencimento = result.value.vencimento
            const pagamento = result.value.pagamento
            const repetir = result.value.repetir
            const dados = {
                descricao: descricao,
                valor: valor,
                categoria: categoria,
                vencimento: vencimento,
                pagamento: pagamento,
                repetir: repetir
            }
            inserir(dados)
        }
    })
}

async function inserir(dados) {
    const response = await fetch('./api/inserir.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    });
    const data = await response.json();
    if (data.status == 'ok') {
        Swal.fire({
            icon: 'success',
            title: 'Registro inserido com sucesso',
            showConfirmButton: false,
            timer: 1500
        })
        movimentacoes();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao inserir o registro',
            showConfirmButton: false,
            timer: 1500
        })
    }
}



function formatarMoeda(elemento) {
    var valor = elemento.value;
    valor = valor.replace(/\D/g, "");
    valor = (valor / 100).toFixed(2) + "";
    valor = valor.replace(".", ",");
    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    elemento.value = valor;
}

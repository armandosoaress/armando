function moedaedit(obj) {
    v_obj = obj
    v_obj.value = v_obj.value.replace(/\D/g, "")
    v_obj.value = v_obj.value.replace(/(\d{2})$/, ",$1")
    v_obj.value = v_obj.value.replace(/(?=(\d{3})+(\D))\B/g, ".")

}


async function atualizarresumo(tipo) {
    const { value: valor } = await Swal.fire({
        title: 'Digite o valor',
        html: '<input id="valorresumo" class="swal2-input" placeholder="R$ 0,00" onkeyup="moedaedit(this)">',
        confirmButtonText: 'Atualizar',
        focusConfirm: false,
        preConfirm: () => {
            return document.getElementById('valorresumo').value
        }
    });

    if (valor) {
        fetch('api/atualizaresumo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tipo: tipo,
                valor: valor
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(() => {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Resumo atualizado com sucesso!',
                    icon: 'success'
                });
                fetch('api/resumo.php')
                    .then(response => response.json())
                    .then(data => {
                        listresumo();
                    })
            })
            .catch(error => {
                Swal.fire({
                    title: 'Erro!',
                    text: `Falha na solicitação: ${error}`,
                    icon: 'error'
                });
            });
    }
}

function listresumo() {
    var anocna = document.getElementById('anocna').value;
    var mescna = document.getElementById('mescna').value;
    fetch('api/resumo.php?ano=' + anocna + '&mes=' + mescna)
        .then(response => response.json())
        .then(data => {
            document.getElementById('dividas').innerText = data.dividas
            document.getElementById('empreendidos').innerText = data.empreendidos
            document.getElementById('investidos').innerText = data.investidos
        })
}
listresumo();


function movimentacoes() {
    const mes = document.getElementById('mes').value;
    const ano = document.getElementById('ano').value;
    const vp = document.getElementById('vp').value

    fetch('./api/movimentacoes.php?mes=' + mes + '&ano=' + ano + '&vp=' + vp)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(movimentacao => {
                    document.getElementById(movimentacao.categoria).innerHTML = '';
                });
                data.forEach(movimentacao => {
                    const data_vencimento = movimentacao.data_vencimento.split('-').reverse().join('/');
                    const data_pagamento = movimentacao.data_pagamento.split('-').reverse().join('/');
                    movimentacao.data_vencimento = data_vencimento;
                    movimentacao.data_pagamento = data_pagamento;

                    if ( movimentacao.data_pagamento == '00/00/0000' ) {
                        movimentacao.data_pagamento = '';
                    }
                    if ( movimentacao.data_vencimento == '00/00/0000' ) {
                        movimentacao.data_vencimento = '';
                    }
                    
                    const divmovimentacao = `
                        <tr>
                            <td>
                            ${movimentacao.repetir == 1
                            ? `${movimentacao.descricao} (Recorrente)`
                            : movimentacao.descricao}
                            </td>
                            <td>${movimentacao.valor}</td>
                            <td>${movimentacao.data_vencimento}</td>
                            <td>${movimentacao.data_pagamento}</td>
                        <td>
                            ${movimentacao.status == 0
                            ? `<img src="img/off.png" height="22px" style="cursor: pointer;" onclick="pagar(${movimentacao.id}, 1)">`
                            : `<img src="img/on.png" height="22px" style="cursor: pointer;" onclick="pagar(${movimentacao.id}, 0)">`
                        }
                        </td>
                        <td>
                            <img src="img/delete.png" style="cursor: pointer; text-align: left;" height="22px" onclick="deletar(${movimentacao.id})">
                            <img src="img/edit.png" style="cursor: pointer; text-align: left;" height="22px" onclick="editar(${movimentacao.id})">
                        </td>
                    </tr>`;
                    document.getElementById(movimentacao.categoria).innerHTML += divmovimentacao;
                });
            } else {
                // remover todas movimentaçoes da "class" resultadosmovimentacoes
                document.querySelectorAll('.resultadosmovimentacoes').forEach(element => {
                    element.innerHTML = '';
                });

            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}






function movimentacoes() {
    const mes = document.getElementById('mes').value;
    const ano = document.getElementById('ano').value;
    const vp = document.getElementById('vp').value

    fetch('./api/movimentacoes.php?mes=' + mes + '&ano=' + ano + '&vp=' + vp)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('.resultadosmovimentacoes').forEach(element => {
                element.innerHTML = '';
            });
            if (data.length > 0) {

                data.forEach(movimentacao => {
                    const data_vencimento = movimentacao.data_vencimento.split('-').reverse().join('/');
                    const data_pagamento = movimentacao.data_pagamento.split('-').reverse().join('/');
                    movimentacao.data_vencimento = data_vencimento;
                    movimentacao.data_pagamento = data_pagamento;

                    if (movimentacao.data_pagamento == '00/00/0000') {
                        movimentacao.data_pagamento = '';
                    }
                    if (movimentacao.data_vencimento == '00/00/0000') {
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
                            ? `<i  style="cursor: pointer;font-size: 20px;" onclick="pagar(${movimentacao.id}, 1)" class="bi bi-toggle2-off"></i>`
                            : `<i style="cursor: pointer;font-size: 20px;color:#0011ff" onclick="pagar(${movimentacao.id}, 0)" class="bi bi-toggle2-on"></i>`
                        }
                            </td>

                            <td>
                            ${movimentacao.repetir == 0
                            ? `<i class="bi bi-trash" style="cursor: pointer; text-align: left; padding-right: 10px;" onclick="deletar(${movimentacao.id})"></i>
                                   <i class="bi bi-pencil" style="cursor: pointer; text-align: left;" onclick="editar(${movimentacao.id})"></i>`
                            : `<i class="bi bi-trash" style="cursor: pointer; text-align: left; padding-right: 10px;" onclick="deletar(${movimentacao.id})"></i>`
                        }
                        </td>
                        
                       
                        
                    </tr>`;
                    document.getElementById(movimentacao.categoria).innerHTML += divmovimentacao;
                });
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}






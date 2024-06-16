async function fetchFinancas() {
    // limpar tabela
    document.getElementById('investimentostablebody').innerHTML = '';
    document.getElementById('dividastablebody').innerHTML = '';
    document.getElementById('empreendidostablebody').innerHTML = '';
    try {
        // Fazendo a requisição e convertendo a resposta em JSON
        const response = await fetch('api/financas.php');
        const data = await response.json();

        // Desestruturando os dados
        const { investidos, dividas, empreendidos } = data;

        // Função auxiliar para adicionar uma linha à tabela
        function addRowToTable(tableBodyId, item) {
            const tableBody = document.getElementById(tableBodyId);
            const tr = document.createElement('tr');
            var tabela = '';

            if (tableBodyId == 'investimentostablebody') {
                tabela = 'investidos';
            }
            if (tableBodyId == 'dividastablebody') {
                tabela = 'dividas';
            }
            if (tableBodyId == 'empreendidostablebody') {
                tabela = 'empreendidos';
            }
            // converter data 
            var datacreate = new Date(item.created_at);
            datacreate = datacreate.toLocaleDateString('pt-BR');
            tr.innerHTML = `
          <td>${datacreate}</td>
          <td>${item.valor}</td>
          <td>
          <!-- Ícone de edição -->
          <i class="bi bi-pencil" style="cursor: pointer; text-align: left; padding-right: 10px;" onclick="editarfinanca(${item.id}, '${tabela}')"></i>
          <!-- Ícone de exclusão -->
          <i class="bi bi-trash" style="cursor: pointer; text-align: left;" onclick="excluirfinanca(${item.id}, '${tabela}')"></i>
          
          </td>
        `;
            tableBody.appendChild(tr);
        }

        // Adicionando dados às tabelas correspondentes
        investidos.forEach(item => addRowToTable('investimentostablebody', item));
        dividas.forEach(item => addRowToTable('dividastablebody', item));
        empreendidos.forEach(item => addRowToTable('empreendidostablebody', item));
    } catch (error) {
        console.error('Erro ao buscar os dados financeiros:', error);
    }
}

// Chamando a função para buscar e exibir os dados
fetchFinancas();

function editarfinanca(id, tabela) {
    // Buscar os dados da finança usando o ID e a tabela fornecidos
    fetch(`api/financas.php?funcao=editarviz&id=${id}&tabela=${tabela}`)
        .then(response => {
            // Verificar se a resposta é válida
            if (!response.ok) {
                throw new Error('Erro na resposta da rede');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: 'Editar Finança',
                html: `
                    <input id="data" class="swal2-input" placeholder="Data" type="date" value="${data.created_at}">
                    <input id="valor" onkeyup="moedaedit(this)" class="swal2-input" placeholder="Valor" value="${data.valor}">
                `,
                showCancelButton: true,
                confirmButtonText: 'Editar',
                preConfirm: () => {
                    const data = Swal.getPopup().querySelector('#data').value;
                    const valor = Swal.getPopup().querySelector('#valor').value;

                    if (!data || !valor) {
                        Swal.showValidationMessage('Preencha todos os campos');
                    }

                    return { data, valor };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const data = result.value.data;
                    const valor = result.value.valor;
                    const dados = {
                        data: data,
                        valor: valor,
                        id: id,
                        tabela: tabela
                    };

                    editar(dados);
                }
            });
        })
        .catch(error => {
            // Mostrar um erro para o usuário em caso de falha
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `Erro ao buscar a finança: ${error.message}`
            });
            console.error('Erro ao buscar a finança:', error);
        });
}

function editar(dados) {

    fetch('api/financas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ funcao: 'editar', ...dados })
    })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'ok') {
                fetchFinancas();
                Swal.fire({
                    icon: 'success',
                    title: 'Finança editada com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
}


function excluirfinanca(id, tabela) {
    Swal.fire({
        title: 'Tem certeza?',
        text: 'Você não poderá reverter isso!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('api/financas.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ funcao: 'excluir', id: id, tabela: tabela })
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === 'ok') {
                        fetchFinancas();
                        Swal.fire({
                            icon: 'success',
                            title: 'Finança excluída com sucesso',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
        }
    });
}

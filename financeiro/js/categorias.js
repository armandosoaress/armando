function listacategorias() {
  fetch('./api/catergorias.php')
    .then(response => response.json())
    .then(data => {
      const promises = data.map(categoria => {
        const divcategoria = `
          <div class="col-md-6">
              <h1 style="position:static" >${categoria.descricao}</h1>
              <table class="table table-responsive">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Vencimento</th>
                    <th>Pagamento</th>
                    <th>Pago</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody id="${categoria.id}" class="resultadosmovimentacoes">
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total</th>
                    <th class="totalis" id="total${categoria.id}"></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </tfoot>
                <tfoot>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th onclick="adicionar(${categoria.id})">
                      <img src="img/add.png" height="30px" style="cursor: pointer;">
                    </th>
                  </tr>
                </tfoot>
              </table>
          </div>`;

        // Retornar uma promessa resolvida após a inserção da categoria no DOM
        return new Promise((resolve) => {
          document.getElementById('categorias').innerHTML += divcategoria;
          resolve();
        });
      });

      // Aguardar todas as promessas serem resolvidas
      Promise.all(promises).then(() => {
        // pega o mes atual e o ano atual
        const data = new Date();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
        document.getElementById('mes').value = mes;
        document.getElementById('ano').value = ano;
        movimentacoes();
      });
    })
    .catch(error => {
      console.error('Erro ao buscar categorias:', error);
    });
}


async function listacategoria(id) {
  const response = await fetch('./api/catergorias.php?id=' + id);
  const data = await response.json();
  return data;
}


listacategorias();
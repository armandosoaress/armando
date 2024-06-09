<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <title>Gestão Financeira</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Finaças</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css">
  <script src="js/chart/index.js"></script>
</head>

<body>
  <div class="sideBarre">
    <div class="sideBarre__logo" onclick="showPage('init')" style="cursor: pointer;">
      <img id="logoimg" src="img/67761071.jpg " alt="Logo">
    </div>
    <br>
    <center>
      <span style="color: white;" id="version">Versão 3.0</span>
    </center>
    <div class="sideBarre__menu">
      <ul style="padding-top: 20px;">
        <li class="menu_init" onclick="showPage('init')"><a href="javascript:void(0)" style="color: black;">Resumo</a></li>
        <li class="menu_organizador" onclick="showPage('organizador')"><a href="javascript:void(0)">Finanças</a></li>
        <li class="menu_investimentos" onclick="showPage('investimentos')"><a href="javascript:void(0)">Investimentos</a></li>
        <li class="menu_dividas" onclick="showPage('dividas')"><a href="javascript:void(0)">Dividas</a></li>
        <li class="menu_empreendidos" onclick="showPage('empreendidos')"><a href="javascript:void(0)">Empreendidos</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="mainContent">
    <div class="boxContent">
      <div class="firstRow pagina init" style="flex-wrap: wrap;margin-top: 0px;padding-top: 20px;">




        <div class="col-md-5 ml-auto" style="margin-bottom: 20px;margin-right: 16px;display: flex; justify-content: space-between;">
          <select name="mescna" id="mescna" class="form-control" onchange="resumomes()">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>

          <select name="anocna" id="anocna" class="form-control" onchange="resumomes()" style="margin-left: 16px;">
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>
        </div>

        <div class="col-md-12" style="display: flex; justify-content: space-between;">
          <div class="cardTwo" onclick="atualizarresumo('dividas')">
            <div class="description">
              <p>Dividas</p>
              <h3 id="dividas"></h3>
            </div>
          </div>
          <div class="cardThree" onclick="atualizarresumo('empreendidos')">
            <div class="description">
              <p>Empreendidos</p>
              <h3 id="empreendidos"></h3>
            </div>
          </div>
          <div class="cardOne" onclick="atualizarresumo('investidos')">
            <div class="description">
              <p>Investidos</p>
              <h3 id="investidos"></h3>
            </div>
          </div>
        </div>
        <div class="col-md-12" style="flex-wrap: wrap;padding-top: 40px;">
          <canvas id="myChart" style="width: 544px;display: block;height: 172px;"></canvas>
        </div>
      </div>
      <div class="thirdRow pagina organizador">
        <div class="init" id="init">
          <div class="row">
            <div class="col-md-4">
              <select name="mes" id="vp" class="form-control" onchange="movimentacoes()">
                <option value="1">Vencimento</option>
                <option value="2">Pagamento</option>
              </select>
            </div>
            <div class="col-md-4">
              <select name="mes" id="mes" class="form-control" onchange="movimentacoes()">
                <option value="1">Janeiro</option>
                <option value="2">Fevereiro</option>
                <option value="3">Março</option>
                <option value="4">Abril</option>
                <option value="5">Maio</option>
                <option value="6">Junho</option>
                <option value="7">Julho</option>
                <option value="8">Agosto</option>
                <option value="9">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>
            <div class="col-md-4">
              <select name="ano" id="ano" class="form-control" onchange="movimentacoes()">
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
          </div>
          <div class="row" id="categorias"></div>
        </div>
      </div>
      <div class="secondRow pagina investimentos">
        <h3>Investimentos</h3>
        <p>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Valor</th>
              <th scope="col">Data</th>
              <th scope="col">Categoria</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
        </table>
        <tbody id="investimentostablebody"></tbody>
      </div>

      <div class="secondRow pagina dividas">
        <h3>Dividas</h3>
        <p>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Valor</th>
              <th scope="col">Data</th>
              <th scope="col">Categoria</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody id="dividastablebody"></tbody>
        </table>
      </div>

      <div class="secondRow pagina empreendidos">
        <h3>Empreendidos</h3>
        <p>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Valor</th>
              <th scope="col">Data</th>
              <th scope="col">Categoria</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody id="empreendidostablebody"></tbody>
        </table>
      </div>
      <script src="js/config.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      <script src="js/atualiza.js"></script>
      <script src="js/adicionar.js"></script>
      <script src="js/excluir.js"></script>
      <script src="js/vizualizar.js"></script>
      <script src="js/categorias.js"></script>
      <script src="js/pagar.js"></script>
      <script src="js/resumofin.js"></script>
      <script src="js/page.js"></script>
      <script src="js/chat.js"></script>


      <script>
// Repositório desejado
const owner = "armandosoaress";
const repo = "armando";

// URL da API do GitHub para obter informações sobre o último commit
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;

// Requisição para a API do GitHub
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const ultimoCommit = data[0]; // O último commit está no topo da lista
    const mensagem = ultimoCommit.commit.message;
    const autor = ultimoCommit.commit.author.name;
    const dataCommit = ultimoCommit.commit.author.date;

    // Exibindo informações sobre o último commit na página
    document.getElementById("ultimoCommit").innerHTML = `
      <p><strong>Mensagem:</strong> ${mensagem}</p>
      <p><strong>Autor:</strong> ${autor}</p>
      <p><strong>Data do Commit:</strong> ${dataCommit}</p>
    `;
  })
  .catch(error => {
    console.error('Erro ao obter informações sobre o último commit:', error);
  });
</script>


</body>

</html>
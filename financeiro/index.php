<!DOCTYPE html>
<html lang="pt-br">

<head>

  <meta charset="UTF-8">
  <title>Gestão Financeira</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Finaças</title>

  <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>
  <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Arbutus+Slab'>
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css'>

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css">
  <script src="js/chart/index.js"></script>
  <link rel="icon" href="https://www.armandosoares.com.br/jobs/public/a.jpg" type="image/x-icon">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

</head>

<body>
  <div class="sideBarre">
    <div class="sideBarre__logo" onclick="showPage('init')" style="cursor: pointer;">
      <img id="logoimg" src="img/67761071.jpg " alt="Logo">
    </div>
    <br>
    <center><span style="color: white;" id="version">Carregando...</span></center>

    <div class="sideBarre__menu">
      <ul style="padding-top: 20px;">
        <li class="menu_init" onclick="showPage('init')">
          <a href="javascript:void(0)" style="color: black;">
            <i class="fas fa-chart-line"></i> Resumo
          </a>
        </li>

        <li class="menu_organiza" style="padding-bottom: 0px;">
          <a href="javascript:void(0)" onclick="toggleSubMenu('financasSubMenu')">
            <i class="fas fa-wallet"></i> Finanças
          </a>
          <ul id="financasSubMenu" class="submenu" style="display: none;">
            <li class="menu_organizador" onclick="showPage('organizador')" style="margin-top: 10px;">
              <a href="javascript:void(0)">
                <i class="fas fa-coins"></i> Resumo
              </a>
            </li>
            <li class="menu_investimentos" onclick="showPage('investimentos')">
              <a href="javascript:void(0)">
                <i class="fas fa-piggy-bank"></i> Investimentos
              </a>
            </li>
            <li class="menu_dividas" onclick="showPage('dividas')">
              <a href="javascript:void(0)">
                <i class="fas fa-credit-card"></i> Dívidas
              </a>
            </li>
            <li class="menu_empreendidos" onclick="showPage('empreendidos')" style="padding-bottom: 0px;">
              <a href="javascript:void(0)">
                <i class="fas fa-briefcase"></i> Empreendidos
              </a>
            </li>
          </ul>
        </li>
        <li class="menu_receita" onclick="showPage('receita')">
          <a href="javascript:void(0)">
            <i class="fas fa-file-invoice-dollar"></i> Receita
          </a>
        </li>
        <li class="menu_projetos" onclick="showPage('projetos')">
          <a href="javascript:void(0)">
            <i class="fas fa-tasks"></i> Projetos
          </a>
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

          <button class="btn btn-primary" onclick="lerValoresComVoz()" style="margin-left: 16px;">Resumo por voz</button>

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
              <p>empreendimentos</p>
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

      <div class="secondRow pagina projetos">
        <h3 style="color: white;">Projetos</h3>

        <p>
        <div id="p1" class="mdl-progress mdl-js-progress"></div>
        <script>
          document.querySelector('#p1').addEventListener('mdl-componentupgraded', function() {
            this.MaterialProgress.setProgress(44);
          });
        </script>
        <!-- <div class="kanban__title">
          <h1><i class="material-icons">check</i> To do list</h1>
        </div> -->
        <div class="dd" id="raiamontagem">




        </div>
        <!-- partial -->

      </div>

      <div class="secondRow pagina receita">
        <h3 style="color: white;">Receita Semanal</h3>
        </h3>
        <p>
          <canvas id="myChart2" style="padding-top: 40px;"></canvas>
        <div style="padding-top: 5px;">
          <p style="color:white">VALOR TOTAL : <span id="totalreceita"></span></p>
        </div>
      </div>

      <menu class="kanban">
        <button><i class="material-icons">settings</i></button>
      </menu>


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
      <script src="js/versao.js"></script>
      <script src="js/voz.js"></script>
      <script src="js/receita.js"></script>
      <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js'></script>
      <script src="js/kanban.js"></script>


</body>

</html>
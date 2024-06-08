function resumomes() {
  listresumo();
  ano = document.getElementById('anocna').value;
  mes = document.getElementById('mescna').value;


  fetch('api/resumomes.php?ano=' + ano + '&mes=' + mes)
    .then(response => response.json())
    .then(data => {

      // Lista de todos os meses
      const todosMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

      // Seleciona os meses até o mês atual
      const xValues = todosMeses.slice(0, mes);

      // Função para gerar dados do dataset até o mês atual
      const gerarDados = (dados) => xValues.map((_, index) => dados[index + 1]);

      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: gerarDados(data.investidos),
            borderColor: "yellow",
            backgroundColor: "rgba(255, 255, 0, 0.2)", // Fundo amarelo transparente
            fill: true,
          },
          {
            label: 'Dívidas',
            data: gerarDados(data.dividas),
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.2)", // Fundo vermelho transparente
            fill: true,
          },
          {
            label: 'Empreendidos',
            data: gerarDados(data.empreendidos),
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)", // Fundo azul transparente
            fill: true,
          }
        ]
      };

      new Chart("myChart", {
        type: "line",
        data: datamesa,
        options: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontColor: 'white'
            }
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ': R$ ' + tooltipItem.yLabel.toLocaleString();
              }
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                fontColor: 'white', // Cor dos ticks do eixo Y
                callback: function (value) {
                  return 'R$ ' + value.toLocaleString();
                }
              },
              gridLines: {
                color: 'rgba(255, 255, 255, 0.2)' // Cor das linhas de grade
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: 'white' // Cor dos ticks do eixo X
              },
              gridLines: {
                color: 'rgba(255, 255, 255, 0.2)' // Cor das linhas de grade
              }
            }]
          }
        }
      });

    });
}
resumomes();
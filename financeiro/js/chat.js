const ano = new Date().getFullYear();
fetch('api/resumomes.php?ano=' + ano)
  .then(response => response.json())
  .then(data => {
    const xValues = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1], data.investidos[2], data.investidos[3], data.investidos[4], data.investidos[5], data.investidos[6], data.investidos[7], data.investidos[8], data.investidos[9], data.investidos[10], data.investidos[11], data.investidos[12]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1], data.dividas[2], data.dividas[3], data.dividas[4], data.dividas[5], data.dividas[6], data.dividas[7], data.dividas[8], data.dividas[9], data.dividas[10], data.dividas[11], data.dividas[12]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1], data.empreendidos[2], data.empreendidos[3], data.empreendidos[4], data.empreendidos[5], data.empreendidos[6], data.empreendidos[7], data.empreendidos[8], data.empreendidos[9], data.empreendidos[10], data.empreendidos[11], data.empreendidos[12]],
            borderColor: "blue",
            fill: false,
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'black'
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
              callback: function (value, index, values) {
                return 'R$ ' + value.toLocaleString();
              }
            }
          }]
        }
      }
    });

  })
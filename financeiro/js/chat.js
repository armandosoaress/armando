const ano = new Date().getFullYear();
fetch('api/resumomes.php?ano=' + ano)
  .then(response => response.json())
  .then(data => {

    const mes = new Date().getMonth() + 1;


    if (mes == 12) {
      const xValues = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      var datamesa = {
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
      };
    }
    if (mes == 11) {
      const xValues = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'];
      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1], data.investidos[2], data.investidos[3], data.investidos[4], data.investidos[5], data.investidos[6], data.investidos[7], data.investidos[8], data.investidos[9], data.investidos[10, data.investidos[11]]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1], data.dividas[2], data.dividas[3], data.dividas[4], data.dividas[5], data.dividas[6], data.dividas[7], data.dividas[8], data.dividas[9], data.dividas[10, data.dividas[11]]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1], data.empreendidos[2], data.empreendidos[3], data.empreendidos[4], data.empreendidos[5], data.empreendidos[6], data.empreendidos[7], data.empreendidos[8], data.empreendidos[9], data.empreendidos[10, data.empreendidos[11]]],
            borderColor: "blue",
            fill: false,
          }
        ]
      };
    }
    if (mes == 10) {
      const xValues = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro'];
      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1], data.investidos[2], data.investidos[3], data.investidos[4], data.investidos[5], data.investidos[6], data.investidos[7], data.investidos[8], data.investidos[9], data.investidos[10]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1], data.dividas[2], data.dividas[3], data.dividas[4], data.dividas[5], data.dividas[6], data.dividas[7], data.dividas[8], data.dividas[9], data.dividas[10]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1], data.empreendidos[2], data.empreendidos[3], data.empreendidos[4], data.empreendidos[5], data.empreendidos[6], data.empreendidos[7], data.empreendidos[8], data.empreendidos[9], data.empreendidos[10]],
            borderColor: "blue",
            fill: false,
          }
        ]
      };

    }
    if (mes == 9) {
      const xValues = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'];
      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1], data.investidos[2], data.investidos[3], data.investidos[4], data.investidos[5], data.investidos[6], data.investidos[7], data.investidos[8], data.investidos[9]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1], data.dividas[2], data.dividas[3], data.dividas[4], data.dividas[5], data.dividas[6], data.dividas[7], data.dividas[8], data.dividas[9]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1], data.empreendidos[2], data.empreendidos[3], data.empreendidos[4], data.empreendidos[5], data.empreendidos[6], data.empreendidos[7], data.empreendidos[8], data.empreendidos[9]],
            borderColor: "blue",
            fill: false,
          }
        ]

      };

    }
    if (mes == 8) {
      const xValues = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'];
      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1], data.investidos[2], data.investidos[3], data.investidos[4], data.investidos[5], data.investidos[6], data.investidos[7], data.investidos[8]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1], data.dividas[2], data.dividas[3], data.dividas[4], data.dividas[5], data.dividas[6], data.dividas[7], data.dividas[8]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1], data.empreendidos[2], data.empreendidos[3], data.empreendidos[4], data.empreendidos[5], data.empreendidos[6], data.empreendidos[7], data.empreendidos[8]],
            borderColor: "blue",
            fill: false,
          }
        ]
      };
    }
    if (mes == 7) {
      const xValues = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1], data.investidos[2], data.investidos[3], data.investidos[4], data.investidos[5], data.investidos[6], data.investidos[7]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1], data.dividas[2], data.dividas[3], data.dividas[4], data.dividas[5], data.dividas[6], data.dividas[7]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1], data.empreendidos[2], data.empreendidos[3], data.empreendidos[4], data.empreendidos[5], data.empreendidos[6], data.empreendidos[7]],
            borderColor: "blue",
            fill: false,
          }
        ]
      };
    }
    if (mes == 6) {
      const xValues = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'];
      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1], data.investidos[2], data.investidos[3], data.investidos[4], data.investidos[5], data.investidos[6]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1], data.dividas[2], data.dividas[3], data.dividas[4], data.dividas[5], data.dividas[6]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1], data.empreendidos[2], data.empreendidos[3], data.empreendidos[4], data.empreendidos[5], data.empreendidos[6]],
            borderColor: "blue",
            fill: false,
          }
        ]
      };
    }
    if (mes == 5) {
      const xValues = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'];
      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1], data.investidos[2], data.investidos[3], data.investidos[4], data.investidos[5]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1], data.dividas[2], data.dividas[3], data.dividas[4], data.dividas[5]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1], data.empreendidos[2], data.empreendidos[3], data.empreendidos[4], data.empreendidos[5]],
            borderColor: "blue",
            fill: false,
          }
        ]
      };
    }
    if (mes == 4) {
      const xValues = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];
      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1], data.investidos[2], data.investidos[3], data.investidos[4]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1], data.dividas[2], data.dividas[3], data.dividas[4]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1], data.empreendidos[2], data.empreendidos[3], data.empreendidos[4]],
            borderColor: "blue",
            fill: false,
          }
        ]
      };
    }
    if (mes == 3) {
      const xValues = ['Janeiro', 'Fevereiro', 'Março'];
      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1], data.investidos[2], data.investidos[3]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1], data.dividas[2], data.dividas[3]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1], data.empreendidos[2], data.empreendidos[3]],
            borderColor: "blue",
            fill: false,
          }
        ]
      };
    }
    if (mes == 2) {
      const xValues = ['Janeiro', 'Fevereiro'];
      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1], data.investidos[2]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1], data.dividas[2]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1], data.empreendidos[2]],
            borderColor: "blue",
            fill: false,
          }
        ]
      };
    }
    if (mes == 1) {
      const xValues = ['Janeiro'];
      var datamesa = {
        labels: xValues,
        datasets: [
          {
            label: 'Investidos',
            data: [data.investidos[1]],
            borderColor: "yellow",
            fill: false,
          },
          {
            label: 'Dívidas',
            data: [data.dividas[1]],
            borderColor: "red",
            fill: false,
          },
          {
            label: 'Empreendidos',
            data: [data.empreendidos[1]],
            borderColor: "blue",
            fill: false,
          }
        ]
      };
    }

    new Chart("myChart", {
      type: "line",
      data: datamesa,
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
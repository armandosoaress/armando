function receita() {
    fetch('./api/receita.php')
        .then(response => response.json())
        .then(data => {
            var d = new Date();
            var n = d.getDay();
            var xValues = [];
            var yValues = [];

            // Ajustar os valores de x e y com base no dia atual da semana

            var totalreceita = 0;
            data.forEach(element => {
                totalreceita += parseFloat(element['tempo']);
            });
            document.getElementById("totalreceita").innerHTML = totalreceita * 40 + " R$";

            switch (n) {
                case 0:
                    xValues = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO", "DOMINGO"];
                    yValues = [data[0]['tempo'], data[1]['tempo'], data[2]['tempo'], data[3]['tempo'], data[4]['tempo'], data[5]['tempo'], data[6]['tempo']];
                    break;
                case 1:
                    xValues = ["SEGUNDA"];
                    yValues = [data[0]['tempo']];
                    break;
                case 2:
                    xValues = ["SEGUNDA", "TERÇA"];
                    yValues = [data[0]['tempo'], data[1]['tempo']];
                    break;
                case 3:
                    xValues = ["SEGUNDA", "TERÇA", "QUARTA"];
                    yValues = [data[0]['tempo'], data[1]['tempo'], data[2]['tempo']];
                    break;
                case 4:
                    xValues = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA"];
                    yValues = [data[0]['tempo'], data[1]['tempo'], data[2]['tempo'], data[3]['tempo']];
                    break;
                case 5:
                    xValues = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA"];
                    yValues = [data[0]['tempo'], data[1]['tempo'], data[2]['tempo'], data[3]['tempo'], data[4]['tempo']];
                    break;
                case 6:
                    xValues = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
                    yValues = [data[0]['tempo'], data[1]['tempo'], data[2]['tempo'], data[3]['tempo'], data[4]['tempo'], data[5]['tempo']];
                    break;
            }

            // Criar o gráfico
            var myChart = new Chart("myChart2", {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [{
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(255,255,0,1.0)",
                        pointRadius: 7,
                        pointHoverRadius: 5,
                        borderColor: "rgba(255,255,255,1.0)",
                        data: yValues
                    }]
                },
                options: {
                    legend: { display: false },
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: 0,
                                max: 8,
                                fontColor: "white",
                            },
                            gridLines: {
                                color: "rgba(255,255,255,0.2)"
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'white'
                            },
                            gridLines: {
                                color: "white"
                            }
                        }]
                    },
                    onClick: function (event, elements) {
                        if (elements.length > 0) {
                            var firstPoint = elements[0];
                            var datasetIndex = firstPoint._datasetIndex;
                            var index = firstPoint._index;
                            var label = myChart.data.labels[index];
                            var value = myChart.data.datasets[datasetIndex].data[index];
                            handleClickOnPoint(label, value);
                        }
                    }
                }
            });


        });
}



function handleClickOnPoint(label, value) {
    const dayOffsets = {
        "SEGUNDA": 0,
        "TERÇA": 1,
        "QUARTA": 2,
        "QUINTA": 3,
        "SEXTA": 4,
        "SÁBADO": 5,
        "DOMINGO": 6
    };
    if (!(label in dayOffsets)) return;
    var d = new Date();
    var n = d.getDay();
    var x = d.getDate() - n + (n === 0 ? -6 : 1);
    var y = new Date(d.setDate(x));
    y.setDate(y.getDate() + dayOffsets[label]);
    var z = y.toISOString().split('T')[0];
    Swal.fire({
        title: "Informe o tempo e a data",
        html: `
        <input id="swal-input1" type="time" class="swal2-input">
        <input id="swal-input2" type="date" class="swal2-input" value="${z}">
    `,
        focusConfirm: false,
        preConfirm: () => {
            return {
                time: document.getElementById("swal-input1").value,
                date: document.getElementById("swal-input2").value
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const formValues = result.value;

            if (formValues.time === "" || formValues.date === "") {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Preencha todos os campos!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }


            fetch('./api/receitacad.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tempo: formValues.time,
                    data: formValues.date
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.mensagem === 'success') {
                        receita();
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'Receita cadastrada com sucesso!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    } else if (data.mensagem === 'existe') {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Já existe uma receita cadastrada para essa data!',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Erro ao cadastrar a receita!',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                }
                );
        }
    }
    );
}


receita();
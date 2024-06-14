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
        document.getElementById("totalreceita").innerHTML = totalreceita;

        switch (n) {
            case 0:
                xValues = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];
                yValues = [data[0]['tempo'], data[1]['tempo'], data[2]['tempo'], data[3]['tempo'], data[4]['tempo'], data[5]['tempo'], data[6]['tempo']];
                break;
            case 1:
                xValues = ["SEG"];
                yValues = [data[0]['tempo']];
                break;
            case 2:
                xValues = ["SEG", "TER"];
                yValues = [data[0]['tempo'], data[1]['tempo']];
                break;
            case 3:
                xValues = ["SEG", "TER", "QUA"];
                yValues = [data[0]['tempo'], data[1]['tempo'], data[2]['tempo']];
                break;
            case 4:
                xValues = ["SEG", "TER", "QUA", "QUI"];
                yValues = [data[0]['tempo'], data[1]['tempo'], data[2]['tempo'], data[3]['tempo']];
                break;
            case 5:
                xValues = ["SEG", "TER", "QUA", "QUI", "SEX"];
                yValues = [data[0]['tempo'], data[1]['tempo'], data[2]['tempo'], data[3]['tempo'], data[4]['tempo']];
                break;
            case 6:
                xValues = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
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
                    pointRadius: 10,
                    pointHoverRadius: 15,
                    borderColor: "rgba(255,255,255,1.0)",
                    borderWidth: 3,
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

        function handleClickOnPoint(label, value) {
            const dayOffsets = {
                "DOM": -6, // Domingo (último)
                "SEG": -1, // Segunda-feira
                "TER": 0,  // Terça-feira
                "QUA": 1,  // Quarta-feira
                "QUI": 2,  // Quinta-feira
                "SEX": 3,  // Sexta-feira
                "SAB": 4   // Sábado (próximo)
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

    });


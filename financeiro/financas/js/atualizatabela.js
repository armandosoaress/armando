function atualizatabela(mes, ano, custos) {
    var fixos = document.getElementById("fixos");
    fixos.innerHTML = "";
    var totalfixos = 0;
    for (let i = 0; i < custos.fixos.length; i++) {
        var databr = custos.fixos[i].data;
        databr = databr.split("-");
        databr = databr[2] + "/" + databr[1] + "/" + databr[0];
        var pago = custos.fixos[i].pago ? "Sim" : "Não";

        if (custos.fixos[i].pago) {
            var pagoicon = "<img src='img/on.png' width='35px' onclick='pagarfixo(" + i + "," + parseInt(databr.split("/")[1]) + "," + parseInt(databr.split("/")[2]) + "," + custos.fixos[i].pago + ",1)'>";
        } else {
            var pagoicon = "<img src='img/off.png' width='35px' onclick='pagarfixo(" + i + "," + parseInt(databr.split("/")[1]) + "," + parseInt(databr.split("/")[2]) + "," + custos.fixos[i].pago + ",0)'>";
        }

        if (mes == parseInt(databr.split("/")[1]) && ano == parseInt(databr.split("/")[2])) {
            custos.fixos[i].valor = parseFloat(custos.fixos[i].valor);
            totalfixos = totalfixos + custos.fixos[i].valor;
            fixos.innerHTML += `
                <tr>
                    <td>${custos.fixos[i].descricao}</td>
                    <td>${custos.fixos[i].valor} R$</td>
                    <td>${databr}</td>
                    <td>${pagoicon}</td>
                    <td><img src='img/delete.png' width='35px' onclick='deletarfixo(${i},${mes},${ano})'></td>
                </tr>
            `;
        }
    }
    document.getElementById("totalfixos").innerHTML = totalfixos + " R$";


    // ************//

    //custos variaveis
    var variaveis = document.getElementById("variaveis");
    variaveis.innerHTML = "";
    var totalvariaveis = 0;
    for (let i = 0; i < custos.variaveis.length; i++) {
        var databr = custos.variaveis[i].data;
        databr = databr.split("-");
        databr = databr[2] + "/" + databr[1] + "/" + databr[0];
        var pago = custos.variaveis[i].pago ? "Sim" : "Não";

        if (custos.variaveis[i].pago) {
            var pagoicon = "<img src='img/on.png' width='35px' onclick='pagarvariavel(" + i + "," + parseInt(databr.split("/")[1]) + "," + parseInt(databr.split("/")[2]) + ")'>";
        } else {
            var pagoicon = "<img src='img/off.png' width='35px' onclick='pagarvariavel(" + i + "," + parseInt(databr.split("/")[1]) + "," + parseInt(databr.split("/")[2]) + ")'>";
        }
        if (mes == parseInt(databr.split("/")[1]) && ano == parseInt(databr.split("/")[2])) {
            custos.variaveis[i].valor = parseFloat(custos.variaveis[i].valor);
            totalvariaveis += custos.variaveis[i].valor;
            variaveis.innerHTML += `
                <tr>
                    <td>${custos.variaveis[i].descricao}</td>
                    <td>${custos.variaveis[i].valor} R$</td>
                    <td>${databr}</td>
                    <td>${pagoicon}</td>
                    <td><img src='img/delete.png' width='35px' onclick='deletarvariavel(${i},${mes},${ano})'></td>
                </tr>
            `;
        }
    }
    document.getElementById("totalvariaveis").innerHTML = totalvariaveis + " R$";
    // ************//

    //investimentos
    var investimentos = document.getElementById("investimentos");
    investimentos.innerHTML = "";
    var totalinvestimentos = 0;
    for (let i = 0; i < custos.investimentos.length; i++) {
        var databr = custos.investimentos[i].data;
        databr = databr.split("-");
        databr = databr[2] + "/" + databr[1] + "/" + databr[0];
        var pago = custos.investimentos[i].pago ? "Sim" : "Não";

        if (custos.investimentos[i].pago) {
            var pagoicon = "<img src='img/on.png' width='35px' onclick='pagarinvestimento(" + i + "," + parseInt(databr.split("/")[1]) + "," + parseInt(databr.split("/")[2]) + ")'>";
        } else {
            var pagoicon = "<img src='img/off.png' width='35px' onclick='pagarinvestimento(" + i + "," + parseInt(databr.split("/")[1]) + "," + parseInt(databr.split("/")[2]) + ")'>";
        }
        if (mes == parseInt(databr.split("/")[1]) && ano == parseInt(databr.split("/")[2])) {
            custos.investimentos[i].valor = parseFloat(custos.investimentos[i].valor);
            totalinvestimentos += custos.investimentos[i].valor;
            investimentos.innerHTML += `
                <tr>
                    <td>${custos.investimentos[i].descricao}</td>
                    <td>${custos.investimentos[i].valor} R$</td>
                    <td>${databr}</td>
                    <td>${pagoicon}</td>
                    <td><img src='img/delete.png' width='35px' onclick='deletarinvestimento(${i},${mes},${ano})'></td>
                </tr>
            `;
        }
    }
    document.getElementById("totalinvestimentos").innerHTML = totalinvestimentos + " R$";
    // ************//

    //custos extras
    var custosextras = document.getElementById("custosextras");
    custosextras.innerHTML = "";
    var totalcustosextras = 0;
    for (let i = 0; i < custos.custosextras.length; i++) {
        var databr = custos.custosextras[i].data;
        databr = databr.split("-");
        databr = databr[2] + "/" + databr[1] + "/" + databr[0];
        var pago = custos.custosextras[i].pago ? "Sim" : "Não";

        if (custos.custosextras[i].pago) {
            var pagoicon = "<img src='img/on.png' width='35px' onclick='pagarcustosextra(" + i + "," + parseInt(databr.split("/")[1]) + "," + parseInt(databr.split("/")[2]) + ")'>";
        } else {
            var pagoicon = "<img src='img/off.png' width='35px' onclick='pagarcustosextra(" + i + "," + parseInt(databr.split("/")[1]) + "," + parseInt(databr.split("/")[2]) + ")'>";
        }
        if (mes == parseInt(databr.split("/")[1]) && ano == parseInt(databr.split("/")[2])) {
            custos.custosextras[i].valor = parseFloat(custos.custosextras[i].valor);
            totalcustosextras += custos.custosextras[i].valor;
            custosextras.innerHTML += `
                <tr>
                    <td>${custos.custosextras[i].descricao}</td>
                    <td>${custos.custosextras[i].valor} R$</td>
                    <td>${databr}</td>
                    <td>${pagoicon}</td>
                    <td><img src='img/delete.png' width='35px' onclick='deletarcustosextra(${i},${mes},${ano})'></td>
                </tr>
            `;
        }
    }
    document.getElementById("totalcustosextras").innerHTML = totalcustosextras + " R$";

    //lazer
    var lazer = document.getElementById("lazer");
    lazer.innerHTML = "";
    var totallazer = 0;
    for (let i = 0; i < custos.lazer.length; i++) {
        var databr = custos.lazer[i].data;
        databr = databr.split("-");
        databr = databr[2] + "/" + databr[1] + "/" + databr[0];
        var pago = custos.lazer[i].pago ? "Sim" : "Não";

        if (custos.lazer[i].pago) {
            var pagoicon = "<img src='img/on.png' width='35px' onclick='pagarlazer(" + i + "," + parseInt(databr.split("/")[1]) + "," + parseInt(databr.split("/")[2]) + ")'>";
        } else {
            var pagoicon = "<img src='img/off.png' width='35px' onclick='pagarlazer(" + i + "," + parseInt(databr.split("/")[1]) + "," + parseInt(databr.split("/")[2]) + ")'>";
        }
        if (mes == parseInt(databr.split("/")[1]) && ano == parseInt(databr.split("/")[2])) {
            custos.lazer[i].valor = parseFloat(custos.lazer[i].valor);
            totallazer += custos.lazer[i].valor;
            lazer.innerHTML += `
                <tr>
                    <td>${custos.lazer[i].descricao}</td>
                    <td>${custos.lazer[i].valor} R$</td>
                    <td>${databr}</td>
                    <td>${pagoicon}</td>
                    <td><img src='img/delete.png' width='35px' onclick='deletarlazer(${i},${mes},${ano})'></td>
                </tr>
            `;
        }
    }
    document.getElementById("totallazer").innerHTML = totallazer + " R$";
}
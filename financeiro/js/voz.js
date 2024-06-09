function lerValoresComVoz() {
    var dividasvoz = document.getElementById("dividas").innerText;
    var investimentosvoz = document.getElementById("investidos").innerText;
    var Empreendidosvoz = document.getElementById("empreendidos").innerText;

    var data = new Date();
    var hora = data.getHours();
    var saudacao = "";
    if (hora >= 0 && hora < 12) {
      saudacao = "Bom dia";
    } else if (hora >= 12 && hora < 18) {
      saudacao = "Boa tarde";
    } else {
      saudacao = "Boa noite";
    }

    // converter os valores para o formato correto
    if (dividasvoz.length == 8) {
      dividasvoz = dividasvoz.replace(".", "");
      dividasvoz = dividasvoz.replace(",", ".");
    }

    if (investimentosvoz.length == 8) {
      investimentosvoz = investimentosvoz.replace(".", "");
      investimentosvoz = investimentosvoz.replace(",", ".");
    }

    if (Empreendidosvoz.length == 8) {
      Empreendidosvoz = Empreendidosvoz.replace(".", "");
      Empreendidosvoz = Empreendidosvoz.replace(",", ".");
    }

    if (dividasvoz.length == 6) {
      dividasvoz = dividasvoz.replace(",", ".");
    }
    if (investimentosvoz.length == 6) {
      investimentosvoz = investimentosvoz.replace(",", ".");
    }

    if (Empreendidosvoz.length == 6) {
      Empreendidosvoz = Empreendidosvoz.replace(",", ".");
    }

    // apagar o que tiver depoi do ponto
    dividasvoz = dividasvoz.split(".")[0];
    investimentosvoz = investimentosvoz.split(".")[0];
    Empreendidosvoz = Empreendidosvoz.split(".")[0];
    // fim da conversão

    var dividasNumerico = dividasvoz;
    var dividasPorExtenso = dividasNumerico;
    var investimentosNumerico = investimentosvoz;
    var investimentosPorExtenso = investimentosNumerico;
    var EmpreendidosNumerico = Empreendidosvoz;
    var EmpreendidosPorExtenso = EmpreendidosNumerico;


    var texto = saudacao + " Senhor. Nossas dívidas estão em " + dividasPorExtenso + " reais.";
    texto += " E nossos empreendimentos estão em " + EmpreendidosPorExtenso + " reais.";
    texto += " Nossos investimentos estão em " + investimentosPorExtenso + " reais.";

    // fazer um fetch para vencendo.php e pegar os valores de hoje e amanhã
    fetch("api/vencendo.php")
      .then(response => response.json())
      .then(data => {
        montarvoz(data.vencendohoje, data.vencendoamanha, )
      });

    function montarvoz(vencendohoje, vencendoamanha) {
      for (let i = 0; i < vencendohoje.length; i++) {
        const element = vencendohoje[i];
        if (i == 0) {
          texto += " Hoje vence " + element.descricao;
        } else {
          texto += " e " + element.descricao;
        }
      }
      for (let i = 0; i < vencendoamanha.length; i++) {
        const element = vencendoamanha[i];
        if (i == 0) {
          texto += " Amanhã vence " + element.descricao;
        } else {
          texto += " e " + element.descricao;
        }
      }

      var vozes = window.speechSynthesis.getVoices();
      var vozMasculina = vozes.find(voice => voice.name === 'Google português do Brasil masculino');
      var utterance = new SpeechSynthesisUtterance(texto);

      // Definindo a voz masculina
      utterance.voice = vozMasculina;

      // Ajustando a propriedade de pitch para deixar a voz mais grave
      utterance.pitch = 0;

      // Executando a síntese de fala
      window.speechSynthesis.speak(utterance);
    }
  }
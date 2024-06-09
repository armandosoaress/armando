const owner = "armandosoaress";
const repo = "armando";

// URL da API do GitHub para obter informações sobre as últimas actions
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs`;

// Requisição para a API do GitHub
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data.workflow_runs[0].created_at);
        // converter 2024-06-09T16:40:25Z para 09/06/2024 13:40:25
        let dataCriacao = new Date(data.workflow_runs[0].created_at);
        let dataFormatada = dataCriacao.toLocaleDateString() + " " + dataCriacao.toLocaleTimeString();
        document.getElementById('version').innerHTML = "V:" + data.total_count + " - " + dataFormatada;
    })
    .catch(error => {
        console.error('Erro ao obter informações sobre as últimas actions:', error);
    });
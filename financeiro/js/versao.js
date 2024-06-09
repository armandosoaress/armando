const owner = "armandosoaress";
const repo = "armando";

// URL da API do GitHub para obter informações sobre as últimas actions
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs`;

// Requisição para a API do GitHub
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        document.getElementById('version').innerHTML = "V.." + data.total_count;
    })
    .catch(error => {
        console.error('Erro ao obter informações sobre as últimas actions:', error);
    });
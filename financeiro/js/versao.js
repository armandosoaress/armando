const owner = "armandosoaress";
const repo = "armando";

// URL da API do GitHub para obter informações sobre o último commit
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;

// Requisição para a API do GitHub
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        document.getElementById('version').innerHTML = data[0].commit.message;
    })
    .catch(error => {
        console.error('Erro ao obter informações sobre o último commit:', error);
    });
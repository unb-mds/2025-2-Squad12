// URL da API do backend
const API_URL = "http://localhost:5000/data";

// Função principal chamada ao carregar a página
async function loadNews() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        console.log("Dados recebidos do backend:", data);

        renderNews(data);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

// Renderiza os itens no DOM
function renderNews(newsList) {
    const container = document.getElementById("news-container");

    if (!container) {
        console.error("Elemento #news-container não encontrado no DOM.");
        return;
    }

    container.innerHTML = ""; // limpa

    newsList.forEach(item => {
        const card = document.createElement("div");
        card.className = "news-card";

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.summary || ""}</p>
            <a href="${item.link}" target="_blank">Leia mais</a>
        `;

        container.appendChild(card);
    });
}

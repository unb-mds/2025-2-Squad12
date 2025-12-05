# Frontend estático — É Crypto

Este frontend é um exemplo simples em HTML, CSS e JavaScript que consome uma API JSON (backend).
Arquivos incluídos:
- `index.html` — página principal
- `styles.css` — estilos
- `app.js` — lógica de fetch e renderização
- `README.md` — este arquivo

## Como usar (local)
1. Descompacte o conteúdo e abra `index.html` no navegador (funciona via arquivo local).
2. Por padrão a URL da API está em `http://localhost:5000/data`. Caso seu backend rode em outra porta, atualize o campo "API URL" no topo da página e clique em "Buscar notícias".
3. Se a API não responder, há um botão "Carregar exemplo local" que mostra dados de fallback.

## Observações
- O frontend assume que a API retorna **um array JSON** ou um objeto com uma propriedade `articles` ou `data` contendo um array.
- Se você quiser habilitar CORS ao rodar o backend (recomendado), certifique-se de permitir origens do frontend (por exemplo `http://localhost:5500` se servir via Live Server).

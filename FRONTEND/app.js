// app.js - frontend que consome JSON
const apiInput = document.getElementById('apiUrl');
const refreshBtn = document.getElementById('refreshBtn');
const sampleBtn = document.getElementById('sampleBtn');
const statusEl = document.getElementById('status');
const newsGrid = document.getElementById('newsGrid');

refreshBtn.addEventListener('click', () => fetchAndRender(apiInput.value));
sampleBtn.addEventListener('click', () => renderSample());

// inicial
fetchAndRender(apiInput.value);

function setStatus(msg, isError=false){
  statusEl.textContent = msg;
  statusEl.style.color = isError ? '#ffb4b4' : '';
}

async function fetchAndRender(url){
  newsGrid.innerHTML = '';
  setStatus('Buscando notícias...');
  try{
    const resp = await fetch(url, {cache:'no-store'});
    if(!resp.ok) throw new Error('Resposta não OK: ' + resp.status);
    const data = await resp.json();
    setStatus('Dados recebidos. Renderizando...');
    renderNews(data);
  }catch(err){
    console.error(err);
    setStatus('Erro ao buscar dados: ' + err.message, true);
    // tenta carregar exemplo local como fallback
    renderSample();
  }
}

// renderiza diferentes formatos razoáveis de JSON
function renderNews(data){
  newsGrid.innerHTML = '';
  let items = [];
  // aceita vários formatos comuns
  if(Array.isArray(data)) items = data;
  else if(data && data.articles && Array.isArray(data.articles)) items = data.articles;
  else if(data && data.data && Array.isArray(data.data)) items = data.data;
  else if(typeof data === 'object') {
    // transforma objetos chave->valor em uma lista
    items = Object.keys(data).map(k => ({title:k, body: JSON.stringify(data[k])}));
  } else {
    newsGrid.innerHTML = '<div class="empty">Resposta da API não contém itens válidos.</div>';
    return;
  }

  if(items.length === 0){
    newsGrid.innerHTML = '<div class="empty">Nenhuma notícia encontrada.</div>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';

    // imagem opcional
    if(item.image || item.img || item.thumbnail){
      const img = document.createElement('img');
      img.src = item.image || item.img || item.thumbnail;
      img.alt = item.title || 'thumb';
      card.appendChild(img);
    }

    const h3 = document.createElement('h3');
    h3.textContent = item.title || item.headline || item.nome || 'Sem título';
    card.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = (item.description || item.summary || item.body || item.text || JSON.stringify(item).slice(0,180));
    card.appendChild(p);

    const meta = document.createElement('div');
    meta.className = 'meta';
    const src = document.createElement('span');
    src.textContent = item.source || item.author || item.site || '';
    const date = document.createElement('span');
    date.textContent = (item.published || item.date || item.data || '');

    meta.appendChild(src);
    meta.appendChild(date);
    card.appendChild(meta);

    newsGrid.appendChild(card);
  });
}

// fallback example data
function renderSample(){
  const sample = [
    {title:'Exemplo: Bitcoin sobe 5% hoje', description:'Notícia fictícia para teste. Este frontend foi carregado com dados de exemplo.' , source:'Agência Exemplo', published:'2025-12-05'},
    {title:'Exemplo: Nova exchange anuncia integração', description:'Integração com APIs e melhorias no scraping.' , source:'Equipe', published:'2025-12-04'}
  ];
  setStatus('Usando dados de exemplo.');
  renderNews(sample);
}

// app.js - Versão Simplificada e Funcional
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const apiInput = document.getElementById('apiUrl');
    const refreshBtn = document.getElementById('refreshBtn');
    const sampleBtn = document.getElementById('sampleBtn');
    const loadFileBtn = document.getElementById('loadFileBtn');
    const statusEl = document.getElementById('status');
    const newsGrid = document.getElementById('newsGrid');
    
    // Configurações
    const DEFAULT_URL = 'http://localhost:8000/noticias.json';
    apiInput.value = DEFAULT_URL;
    
    // Event Listeners
    refreshBtn.addEventListener('click', loadFromServer);
    sampleBtn.addEventListener('click', loadSampleData);
    loadFileBtn.addEventListener('click', loadFromFile);
    
    // Tenta carregar automaticamente ao iniciar
    setTimeout(() => {
        loadFromServer();
    }, 500);
    
    // ========== FUNÇÕES PRINCIPAIS ==========
    
    function setStatus(message, type = 'info') {
        statusEl.textContent = message;
        
        // Cores baseadas no tipo
        const colors = {
            info: '#2196f3',
            success: '#4caf50',
            error: '#f44336',
            warning: '#ff9800'
        };
        
        statusEl.style.borderLeftColor = colors[type] || colors.info;
        statusEl.style.backgroundColor = `${colors[type]}15`;
        
        console.log(`Status: ${message}`);
    }
    
    // 1. Carregar do servidor local
    async function loadFromServer() {
        const url = apiInput.value.trim() || DEFAULT_URL;
        
        setStatus(`Conectando a ${url}...`, 'info');
        newsGrid.innerHTML = '<div class="empty"><h3>Carregando...</h3></div>';
        
        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                cache: 'no-cache'
            });
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            setStatus(`✅ ${data.length || 0} notícias carregadas do servidor`, 'success');
            renderNews(data);
            
        } catch (error) {
            console.error('Erro ao carregar do servidor:', error);
            setStatus(`❌ Erro: ${error.message}. Verifique se o servidor está rodando.`, 'error');
            
            // Sugestão de solução
            setTimeout(() => {
                setStatus('💡 Dica: Execute no terminal: python -m http.server 8000', 'warning');
            }, 2000);
            
            newsGrid.innerHTML = `
                <div class="empty">
                    <h3>Servidor não encontrado</h3>
                    <p>Para usar arquivos locais:</p>
                    <p>1. Abra o terminal nesta pasta</p>
                    <p>2. Execute: <code>python -m http.server 8000</code></p>
                    <p>3. Clique em "Carregar Arquivo JSON" ou use dados de exemplo</p>
                </div>
            `;
        }
    }
    
    // 2. Carregar de arquivo local
    function loadFromFile() {
        // Cria um input de arquivo temporário
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json,application/json';
        
        fileInput.onchange = function(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            setStatus(`Lendo ${file.name}...`, 'info');
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    setStatus(`✅ ${data.length || 0} notícias carregadas de ${file.name}`, 'success');
                    renderNews(data);
                } catch (error) {
                    setStatus(`❌ Erro no arquivo JSON: ${error.message}`, 'error');
                    console.error('Erro no parse JSON:', error);
                }
            };
            
            reader.onerror = function() {
                setStatus('❌ Erro ao ler o arquivo', 'error');
            };
            
            reader.readAsText(file);
        };
        
        fileInput.click();
    }
    
    // 3. Carregar dados de exemplo
    function loadSampleData() {
        const sampleData = [
            {
                title: "Bitcoin atinge máxima histórica",
                description: "O Bitcoin alcançou US$ 100.000 pela primeira vez, impulsionado por adoção institucional.",
                source: "Crypto News",
                published: "2024-03-15",
                image: "https://images.unsplash.com/photo-1516245834210-8a6a5c6d4b0d?w=400&h=250&fit=crop"
            },
            {
                title: "Ethereum completa atualização importante",
                description: "A rede Ethereum implementou com sucesso a atualização que reduz custos de transação.",
                source: "Blockchain Daily",
                published: "2024-03-14",
                image: "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?w-400&h=250&fit=crop"
            },
            {
                title: "NFTs ganham espaço no mercado de arte",
                description: "Artistas digitais estão encontrando novas oportunidades através de tokens não-fungíveis.",
                source: "Tech Art",
                published: "2024-03-13",
                image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=250&fit=crop"
            },
            {
                title: "DeFi atinge marca de US$ 200 bilhões",
                description: "O setor de finanças descentralizadas continua seu crescimento exponencial.",
                source: "Finance Crypto",
                published: "2024-03-12"
            },
            {
                title: "Novo protocolo promete escalabilidade",
                description: "Solução de Layer 2 promete processar 100.000 transações por segundo.",
                source: "Tech Innovations",
                published: "2024-03-11",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop"
            },
            {
                title: "Regulamentação de criptomoedas avança",
                description: "Novas diretrizes regulatórias estão sendo discutidas em vários países.",
                source: "Global Finance",
                published: "2024-03-10"
            }
        ];
        
        setStatus(`✅ ${sampleData.length} notícias de exemplo carregadas`, 'success');
        renderNews(sampleData);
    }
    
    // 4. Renderizar notícias
    function renderNews(data) {
        // Limpa o grid
        newsGrid.innerHTML = '';
        
        // Processa os dados (suporta vários formatos)
        let items = [];
        
        if (Array.isArray(data)) {
            items = data;
        } else if (data && typeof data === 'object') {
            if (Array.isArray(data.articles)) {
                items = data.articles;
            } else if (Array.isArray(data.data)) {
                items = data.data;
            } else if (Array.isArray(data.noticias)) {
                items = data.noticias;
            } else {
                // Converte objeto chave-valor em array
                items = Object.entries(data).map(([key, value]) => ({
                    title: key,
                    description: typeof value === 'object' ? JSON.stringify(value) : String(value),
                    source: 'Arquivo Local'
                }));
            }
        }
        
        // Verifica se há itens
        if (items.length === 0) {
            newsGrid.innerHTML = `
                <div class="empty">
                    <h3>Nenhuma notícia encontrada</h3>
                    <p>O arquivo não contém dados no formato esperado.</p>
                    <p>Formato esperado: Array de objetos com propriedades como title, description, etc.</p>
                </div>
            `;
            return;
        }
        
        // Renderiza cada item
        items.forEach((item, index) => {
            const card = document.createElement('article');
            card.className = 'card';
            
            // Imagem (opcional)
            const imageUrl = item.image || item.img || item.thumbnail || item.urlToImage;
            if (imageUrl) {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = item.title || 'Imagem da notícia';
                img.loading = 'lazy';
                img.onerror = function() {
                    // Se a imagem falhar ao carregar, remove o elemento
                    this.style.display = 'none';
                };
                card.appendChild(img);
            }
            
            // Conteúdo do card
            const contentDiv = document.createElement('div');
            contentDiv.className = 'card-content';
            
            // Título
            const title = document.createElement('h3');
            const titleText = item.title || item.headline || item.name || `Notícia ${index + 1}`;
            title.textContent = titleText.length > 100 ? titleText.substring(0, 100) + '...' : titleText;
            contentDiv.appendChild(title);
            
            // Descrição
            const description = document.createElement('p');
            const descText = item.resumo || item.summary || item.body || item.content || '';
            description.textContent = descText.length > 150 ? 
                descText.substring(0, 150) + '...' : descText;
            contentDiv.appendChild(description);
            
            // Metadados
            const metaDiv = document.createElement('div');
            metaDiv.className = 'meta';
            
            const sourceSpan = document.createElement('span');
            sourceSpan.className = 'source';
            const sourceText = item.source || item.author || item.site || item.fonte || 'Fonte desconhecida';
            sourceSpan.textContent = typeof sourceText === 'object' ? sourceText.name : sourceText;
            
            const dateSpan = document.createElement('span');
            dateSpan.className = 'date';
            const dateText = item.published || item.date || item.publishedAt || item.data || '';
            dateSpan.textContent = dateText ? new Date(dateText).toLocaleDateString('pt-BR') : 'Data não informada';
            
            metaDiv.appendChild(sourceSpan);
            metaDiv.appendChild(dateSpan);
            contentDiv.appendChild(metaDiv);
            
            card.appendChild(contentDiv);
            newsGrid.appendChild(card);
        });
        
        // Atualiza contagem no status
        const currentStatus = statusEl.textContent;
        if (currentStatus.includes('✅')) {
            const baseMsg = currentStatus.split('✅')[0];
            setStatus(`✅ ${items.length} notícias exibidas`, 'success');
        }
    }
});
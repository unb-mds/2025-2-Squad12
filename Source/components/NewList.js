async function NewsList() {
  const res = await fetch(`${API_BASE}/api/news`);
  const news = await res.json();

  app.innerHTML = `<h2>Últimas Notícias</h2>`;

  news.forEach(n => {
    const card = document.createElement("div");
    card.className = "news-card";

    card.innerHTML = `
      <h3 class="news-title">${n.title}</h3>
      <p>${n.summary || ""}</p>
      <small>${n.date} — ${n.source}</small>
    `;

    card.addEventListener("click", () => navigate("news", n.id));

    app.appendChild(card);
  });
}

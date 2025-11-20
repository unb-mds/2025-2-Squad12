async function NewsDetail(id) {
  const res = await fetch(`${API_BASE}/api/news/${id}`);
  const n = await res.json();

  app.innerHTML = `
    <h2>${n.title}</h2>
    <small>${n.date} — ${n.author || "Desconhecido"}</small>
    <p>${n.cleaned_text}</p>
    <a href="${n.url}" target="_blank">Ver na fonte original</a>
  `;

  VoteWidget(id);
}

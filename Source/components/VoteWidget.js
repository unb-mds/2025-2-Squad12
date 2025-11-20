function VoteWidget(newsId) {
  const box = document.createElement("div");
  box.className = "vote-box";

  box.innerHTML = `
    <button class="vote-btn" id="upvote">👍</button>
    <button class="vote-btn" id="downvote">👎</button>
  `;

  app.appendChild(box);

  document.getElementById("upvote").onclick = () => sendVote(newsId, 1);
  document.getElementById("downvote").onclick = () => sendVote(newsId, -1);
}

async function sendVote(id, value) {
  await fetch(`${API_BASE}/api/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, vote: value }),
  });

  alert("Obrigado pelo feedback!");
}

import React, { useEffect, useState } from "react";
import NewsCard from "./components/NewsCard";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Troque essa URL pelo endpoint real do seu backend
    fetch("http://localhost:5000/noticias")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar notícias:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <header className="header">
        <h1>É Crypto 🪙</h1>
        <button className="theme-button" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Tema Claro" : "Tema Escuro"}
        </button>
      </header>

      <main>
        {loading ? (
          <p className="loading">Carregando notícias...</p>
        ) : news.length === 0 ? (
          <p className="loading">Nenhuma notícia encontrada 😕</p>
        ) : (
          <div className="news-container">
            {news.map((item, index) => (
              <NewsCard key={index} item={item} darkMode={darkMode} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

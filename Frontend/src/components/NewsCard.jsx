import React from "react";
import "./NewsCard.css";

export default function NewsCard({ item, darkMode }) {
  return (
    <div className={`news-card ${darkMode ? "dark" : "light"}`}>
      <h2 className="news-title">{item.titulo}</h2>
      <p className="news-text">{item.texto}</p>

      <div className="news-footer">
        <span className="news-info">
          {item.fonte} • {item.autor} • {item.data}
        </span>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          Ir para notícia →
        </a>
      </div>
    </div>
  );
}

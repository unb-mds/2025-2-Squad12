import { useEffect, useState } from "react";
import NewsCard from "./components/NewsCard";

export default function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Exemplo: troque pelo endpoint real do seu backend
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
    <div
      className={`min-h-screen flex flex-col items-center transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-pink-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <header className="w-full flex justify-between items-center p-6 max-w-5xl">
        <h1 className="text-3xl font-bold">É Crypto 🪙</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-full font-semibold transition-colors shadow ${
            darkMode
              ? "bg-pink-400 text-gray-900 hover:bg-pink-300"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {darkMode ? "Tema Claro" : "Tema Escuro"}
        </button>
      </header>

      <main className="w-full max-w-4xl p-4">
        {loading ? (
          <p className="text-center text-lg mt-10">Carregando notícias...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-lg mt-10">
            Nenhuma notícia encontrada 😕
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {news.map((item, i) => (
              <NewsCard key={i} item={item} darkMode={darkMode} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

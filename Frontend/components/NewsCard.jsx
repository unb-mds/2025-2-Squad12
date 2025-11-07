export default function NewsCard({ item, darkMode }) {
  return (
    <div
      className={`rounded-3xl p-8 shadow-xl transition-colors duration-500 ${
        darkMode ? "bg-[#2a0000]" : "bg-white"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-4 ${
          darkMode ? "text-pink-300" : "text-red-700"
        }`}
      >
        {item.titulo}
      </h2>

      <p
        className={`text-justify leading-relaxed font-medium ${
          darkMode ? "text-pink-200" : "text-gray-700"
        }`}
      >
        {item.texto}
      </p>

      <div
        className={`mt-6 flex justify-between text-sm font-medium ${
          darkMode ? "text-pink-300" : "text-gray-600"
        }`}
      >
        <span>
          {item.fonte} • {item.autor} • {item.data}
        </span>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${
            darkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-500"
          } transition-colors`}
        >
          Ir para notícia
        </a>
      </div>
    </div>
  );
}

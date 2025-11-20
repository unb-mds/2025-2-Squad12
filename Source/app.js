const API_BASE = "http://localhost:5000"; // AJUSTE PROVAVELMENTE NECESSÀRIO

const app = document.getElementById("app");

// Rotas
const routes = {
  home: () => NewsList(),
  news: id => NewsDetail(id),
  categories: () => CategoryScreen(),
  about: () => AboutScreen(),
};

// Navegação
document.querySelectorAll("button[data-route]").forEach(btn => {
  btn.addEventListener("click", () => {
    navigate(btn.dataset.route);
  });
});

function navigate(route, param = null) {
  if (param) return routes[route](param);
  routes[route]();
}

navigate("home"); // Carrega página inicial

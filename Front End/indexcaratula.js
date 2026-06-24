// URL base del back end
const API_BACKEND = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const respuesta = await fetch(`${API_BACKEND}/articulos`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const datos = await respuesta.json();
    renderArticulos(datos);
  } catch (e) {
    console.error(e);
  }
});

function renderArticulos(articulos) {
  // Ordenar del más reciente al más antiguo (mayor id primero)
  const ordenados = [...articulos].sort((a, b) => b.id - a.id);

  const destacados = ordenados.slice(0, 3);
  const resto = ordenados.slice(3);

  pintarSeccion(".articulos-verticales", destacados);
  pintarSeccion(".articulos-horizontales", resto);
}

function pintarSeccion(selector, lista) {
  const contenedor = document.querySelector(selector);
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>Todavía no hay artículos en esta sección.</p>";
    return;
  }

  lista.forEach((articulo) => {
    const art = document.createElement("article");
    art.className = "articulo-horizontal";

    art.innerHTML = `
      <a href="index_articulo.html?id=${articulo.id}" class="card-link">
        <div class="card">
          <div class="card__side card__side--front-1">
            <div class="imagen_art">
              <img src="${articulo.imagen1 || "Fotos/Carnaval.jpg"}" alt="${articulo.tituloPrincipal}" />
            </div>
            <div class="card__info-content">
              <p class="card__title">${articulo.tituloPrincipal}</p>
              <p class="card__title">${articulo.subtitulo}</p>
            </div>
          </div>
          <div class="card__side card__side--back card__side--back-1">
            <p class="card__desc">${articulo.descripcion}</p>
            <div class="card__cta">
              <button class="btn-btn--white">Ver artículo</button>
            </div>
          </div>
        </div>
      </a>
    `;

    contenedor.appendChild(art);
  });
}

// Efecto al hacer scroll
const titulo = document.querySelector(".rv-title-center");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    titulo.classList.add("scrolled");
  } else {
    titulo.classList.remove("scrolled");
  }
});
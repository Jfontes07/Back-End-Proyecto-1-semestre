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
  const ordenados = [...articulos].sort((a, b) => b.id - a.id);
  const enEspanol = ordenados.filter((a) => a.idioma !== "ing");
  const enIngles  = ordenados.filter((a) => a.idioma === "ing");
  pintarSeccion("#articulos-esp", enEspanol);
  pintarSeccion("#articulos-ing", enIngles);
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

// ── Scroll: sin vibración ─────────────────────────
// Usamos requestAnimationFrame para no disparar en cada pixel,
// y un threshold alto (180px) para que el toggle quede lejos
// del punto donde el contenido sube al encoger el logo.
const titulo = document.querySelector(".rv-title-center");
let tickPendiente = false;
let estaScrolled   = false;
const UMBRAL = 180; // px — ajustá si querés que cambie antes o después

window.addEventListener("scroll", () => {
  if (tickPendiente) return;
  tickPendiente = true;

  requestAnimationFrame(() => {
    tickPendiente = false;
    const deberiaScrolled = window.scrollY > UMBRAL;
    if (deberiaScrolled === estaScrolled) return; // nada cambió, no tocar el DOM
    estaScrolled = deberiaScrolled;
    titulo.classList.toggle("scrolled", estaScrolled);
  });
}, { passive: true });

// ── Reproductor ───────────────────────────────────
const PLAYLIST = [
  { src: "musica/santamarta.mp3",   titulo: "Santa Marta . Larbanois Carrero" },
  { src: "musica/Catalina.mp3",     titulo: "Montevideo - La Catalina" },
  { src: "musica/rada.mp3",         titulo: "Mi País - Rada" },
  { src: "musica/un_solo_color.mp3",titulo: "Cielo de un solo color - NTVG" },
  { src: "musica/Zitarrosa.mp3",    titulo: "Pa´l que se va - Alfredo Zitarrosa" },
];

function mezclar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

(function iniciarReproductor() {
  const audio    = document.getElementById("rv-audio");
  const btnPlay  = document.getElementById("rv-play");
  const btnPrev  = document.getElementById("rv-prev");
  const btnNext  = document.getElementById("rv-next");
  const songName = document.getElementById("rv-song-name");

  let playlist = mezclar(PLAYLIST);
  let indice   = 0;
  let iniciado = false;

  function cargarCancion(idx) {
    audio.src = playlist[idx].src;
    songName.textContent = "♪ " + playlist[idx].titulo;
  }

  function reproducir() {
    audio.play().catch(() => {});
    btnPlay.textContent = "⏸";
  }

  function pausar() {
    audio.pause();
    btnPlay.textContent = "▶";
  }

  function siguiente() {
    indice = (indice + 1) % playlist.length;
    cargarCancion(indice);
    reproducir();
  }

  function anterior() {
    indice = (indice - 1 + playlist.length) % playlist.length;
    cargarCancion(indice);
    reproducir();
  }

  audio.addEventListener("ended", siguiente);

  btnPlay.addEventListener("click", () => {
    if (!iniciado) { cargarCancion(indice); iniciado = true; }
    audio.paused ? reproducir() : pausar();
  });

  btnNext.addEventListener("click", () => { iniciado = true; siguiente(); });
  btnPrev.addEventListener("click", () => { iniciado = true; anterior(); });

  document.addEventListener("click", function arrancar() {
    if (!iniciado) {
      cargarCancion(indice);
      iniciado = true;
      reproducir();
      document.removeEventListener("click", arrancar);
    }
  });

  cargarCancion(indice);
})();
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMsg = document.getElementById("newsletterMsg");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("newsletterEmail").value.trim();

        if (email === "") {
            newsletterMsg.style.color = "red";
            newsletterMsg.textContent = "Ingresá un correo válido.";
            return;
        }

        newsletterMsg.style.color = "green";
        newsletterMsg.textContent = "¡Te suscribiste correctamente! ✔";

        newsletterForm.reset();
    });
}
const API_KEY = "44d1d07918709a8f6d80b1256f7d25aa";
const API_URL = `https://gnews.io/api/v4/top-headlines?lang=es&max=4&apikey=${API_KEY}`;
let noticias = [];
let indiceActual = 0;
let intervalo;

async function cargarNoticias() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      document.getElementById("noticia-titulo").textContent = "No hay noticias disponibles.";
      return;
    }

    noticias = data.articles.slice(0, 4);
    mostrarNoticia(indiceActual);
    iniciarAutoplay();
  } catch (err) {
    document.getElementById("noticia-titulo").textContent = "Error al cargar noticias.";
    console.error(err);
  }
}

function mostrarNoticia(i) {
  const n = noticias[i];
  document.getElementById("noticia-titulo").textContent = n.title || "Sin título";
  document.getElementById("noticia-desc").textContent = n.description || n.content || "Sin descripción disponible.";
  const img = document.getElementById("noticia-img");
  const placeholder = img.parentElement.querySelector(".placeholder");
  if (n.image) {
    img.src = n.image;
    img.style.display = "block";
    if (placeholder) placeholder.style.display = "none";
  } else {
    img.style.display = "none";
    if (placeholder) placeholder.style.display = "flex";
  }
}

function siguiente() {
  indiceActual = (indiceActual + 1) % noticias.length;
  mostrarNoticia(indiceActual);
  reiniciarAutoplay();
}

function anterior() {
  indiceActual = (indiceActual - 1 + noticias.length) % noticias.length;
  mostrarNoticia(indiceActual);
  reiniciarAutoplay();
}

function iniciarAutoplay() {
  intervalo = setInterval(siguiente, 5000);
}

function reiniciarAutoplay() {
  clearInterval(intervalo);
  iniciarAutoplay();
}

document.getElementById("flechaDer").addEventListener("click", siguiente);
document.getElementById("flechaIzq").addEventListener("click", anterior);
cargarNoticias();

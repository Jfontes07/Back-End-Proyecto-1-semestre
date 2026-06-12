const API_KEY = "pub_076153dfd0454a4da5c2cef8147befc2";
const API_URL = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=es&size=4`;

let noticias = [];
let indiceActual = 0;
let intervalo;

async function cargarNoticias() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    noticias = data.results.slice(0, 4);
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

  if (n.image_url) {
    img.src = n.image_url;
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
// URL base del back end
const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  // Leer el id desde la URL: index_articulo.html?id=3
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("tituloPrincipal").textContent = "No se especificó ningún artículo";
    return;
  }

  try {
    const respuesta = await fetch(`${API_URL}/articulos/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!respuesta.ok) {
      document.getElementById("tituloPrincipal").textContent = "Artículo no encontrado";
      return;
    }

    const datos = await respuesta.json();

    // Título y subtítulo
    document.getElementById("tituloPrincipal").textContent = datos.tituloPrincipal;
    document.getElementById("subtitulo").textContent = datos.subtitulo || "";

    // Contenido con saltos de línea respetados
    const contenidoHTML = (datos.contenido || "")
      .split(/\n\n+/)
     .map(parrafo => {
  if (parrafo.startsWith("##")) return `<h3>${parrafo.slice(2).trim()}</h3>`;
  return `<p>${parrafo.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`;
})
      .join("");
    document.getElementById("contenido").innerHTML = contenidoHTML;

    // Fecha de publicación
    if (datos.fecha) {
      const fecha = new Date(datos.fecha + "T00:00:00");
      document.getElementById("fecha").textContent = "Fecha de publicación: " + fecha.toLocaleDateString("es-UY", {
        day: "numeric", month: "long", year: "numeric"
      });
    }

    // Autor
    document.getElementById("autor").textContent = datos.autor ? `Por ${datos.autor}` : "";

    // Imágenes con lightbox
function abrirLightbox(src) {
  document.getElementById("overlay-img-src").src = src;
  document.getElementById("overlay-img").style.display = "flex";
}

if (datos.imagen1) {
  document.getElementById("Imagen1").src = datos.imagen1;
  document.getElementById("Imagen1").style.cursor = "pointer";
  document.getElementById("Imagen1").onclick = () => abrirLightbox(datos.imagen1);
}
if (datos.imagen2) {
  document.getElementById("Imagen2").src = datos.imagen2;
  document.getElementById("Imagen2").style.cursor = "pointer";
  document.getElementById("Imagen2").onclick = () => abrirLightbox(datos.imagen2);
}
function abrirLightbox(src) {
  document.getElementById("overlay-img-src").src = src;
  const overlay = document.getElementById("overlay-img");
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
}

    // Bibliografía
    if (datos.bibliografia) {
      document.getElementById("bibliografia").innerHTML =
        `Fuente: <a href="${datos.bibliografia}" target="_blank">${datos.bibliografia}</a>`;
    }

    // Título de la pestaña
    document.title = datos.tituloPrincipal + " · Esencia Uruguaya";

  } catch (e) {
    console.error(e);
    document.getElementById("tituloPrincipal").textContent = "Error al cargar el artículo";
  }
});
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
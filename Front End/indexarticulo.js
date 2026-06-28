// URL base del back end
const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  // Leer el id desde la URL: index_articulo.html?id=3
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("tituloPrincipal").textContent =
      "No se especificó ningún artículo";
    return;
  }

  try {
    const respuesta = await fetch(`${API_URL}/articulos/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!respuesta.ok) {
      document.getElementById("tituloPrincipal").textContent =
        "Artículo no encontrado";
      return;
    }

    const datos = await respuesta.json();

    // Pintar los datos en el DOM
    document.getElementById("tituloPrincipal").textContent =
  datos.tituloPrincipal;
document.getElementById("subtitulo").textContent = datos.subtitulo || "";


//Esto hace que el js respete los espacios y saltos de línea del contenido del artículo, y los muestre en el HTML.
const contenidoHTML = (datos.contenido || "")
  .split(/\n\n+/)           // separa por línea en blanco (como en el formulario)
  .map(parrafo => `<p>${parrafo.replace(/\n/g, "<br>")}</p>`)
  .join("");
document.getElementById("contenido").innerHTML = contenidoHTML;

document.getElementById("autor").textContent = datos.autor
  ? `Por ${datos.autor}`
  : "";

// Mostrar imágenes si existen
if (datos.imagen1) {
  document.getElementById("Imagen1").src = datos.imagen1;
}
if (datos.imagen2) {
  document.getElementById("Imagen2").src = datos.imagen2;
}

    document.title = datos.tituloPrincipal + " · Esencia Uruguaya";
  } catch (e) {
    console.error(e);
    document.getElementById("tituloPrincipal").textContent =
      "Error al cargar el artículo";
  }
});
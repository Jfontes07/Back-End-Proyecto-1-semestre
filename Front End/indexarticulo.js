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
    document.getElementById("contenido").textContent = datos.contenido || "";
    document.getElementById("autor").textContent = datos.autor
      ? `Por ${datos.autor}`
      : "";

    // Si en el futuro guardás imágenes, acá las asignás:
    // document.getElementById("Imagen1").src = datos.imagen1;

    document.title = datos.tituloPrincipal + " · Esencia Uruguaya";
  } catch (e) {
    console.error(e);
    document.getElementById("tituloPrincipal").textContent =
      "Error al cargar el artículo";
  }
});
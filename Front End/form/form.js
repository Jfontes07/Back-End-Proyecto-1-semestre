// URL base del back end
const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-articulo");
  const mensaje = document.getElementById("mensaje");

  // ── VISTA PREVIA DE IMÁGENES (por URL) ────────────────
  const inputImagen1 = document.getElementById("imagen1");
  const inputImagen2 = document.getElementById("imagen2");
  const listaImagenes = document.getElementById("listaImagenes");

  function actualizarPreview() {
    const urls = [inputImagen1.value.trim(), inputImagen2.value.trim()].filter(
      (url) => url !== "",
    );
    mostrarImagenes(urls);
  }

  inputImagen1.addEventListener("input", actualizarPreview);
  inputImagen2.addEventListener("input", actualizarPreview);

  // Renderiza el array de URLs como <img>
  function mostrarImagenes(urls) {
    listaImagenes.innerHTML = "";
    urls.forEach((url) => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = "imagen";
      img.style.maxWidth = "200px";
      img.style.margin = "8px";
      listaImagenes.appendChild(img);
    });
  }

  // ── ENVÍO DEL FORMULARIO ───────────────────────────────
  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const tituloPrincipal = document
      .getElementById("tituloPrincipal")
      .value.trim();
    const subtitulo = document.getElementById("subtitulo").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const contenido = document.getElementById("contenido").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const imagen1 = inputImagen1.value.trim();
    const imagen2 = inputImagen2.value.trim();

    if (!tituloPrincipal || !descripcion || !autor) {
      mostrarMensaje(
        "Completá los campos obligatorios: título, autor y descripción.",
        "red",
      );
      return;
    }

    // Objeto a enviar — ahora incluye las URLs de imagen
    const nuevoArticulo = {
      tituloPrincipal,
      subtitulo,
      fecha,
      autor,
      contenido,
      descripcion,
      imagen1,
      imagen2,
    };

    try {
      const respuesta = await fetch(`${API_URL}/articulos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoArticulo),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        mostrarMensaje(
          `¡Artículo publicado! ID asignado: ${datos.id}`,
          "green",
        );
        form.reset();
        listaImagenes.innerHTML = "";
      } else {
        mostrarMensaje(datos.error || "Error al enviar.", "red");
      }
    } catch (error) {
      console.error("Error de red:", error);
      mostrarMensaje(
        "No se pudo conectar con el servidor. ¿Está corriendo el back?",
        "red",
      );
    }
  });

  function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
    mensaje.style.display = "block";

    if (color === "green") {
      const toast = document.getElementById("toast");
      toast.style.background = "#4caf50";
      toast.querySelector("#toast-cerrar").onclick = () => {
        toast.classList.remove("visible");
      };
      toast.classList.add("visible");
    }
  }
});
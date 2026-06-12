// URL base del back end
const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-articulo"); // ✅ id correcto
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    // Leer valores — todos los ids coinciden con el HTML
    const tituloPrincipal = document
      .getElementById("tituloPrincipal")
      .value.trim();
    const subtitulo = document.getElementById("subtitulo").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const contenido = document.getElementById("contenido").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    if (!tituloPrincipal || !descripcion || !autor) {
      mostrarMensaje(
        "Completá los campos obligatorios: título, autor y descripción.",
        "red",
      );
      return;
    }

    // Objeto a enviar — coincide con lo que espera el back
    const nuevoArticulo = {
      tituloPrincipal,
      subtitulo,
      fecha,
      autor,
      contenido,
      descripcion,
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

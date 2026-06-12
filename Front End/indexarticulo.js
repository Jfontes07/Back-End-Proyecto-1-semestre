// URL base del back end
const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const respuesta = await fetch(`${API_URL}/articulos/2`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const datos = await respuesta.json();
    console.log(datos);
  } catch (e) {}
});

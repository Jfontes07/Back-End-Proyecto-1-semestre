// URL base del back end
const API_BACKEND = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const respuesta = await fetch(`${API_BACKEND}/articulos`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const datos = await respuesta.json();
    console.log(datos);
  } catch (e) {
    console.error(e);
  }
});

// Efecto al hacer scroll
const titulo = document.querySelector(".rv-title-center");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    titulo.classList.add("scrolled");
  } else {
    titulo.classList.remove("scrolled");
  }
});
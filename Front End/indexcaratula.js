// URL base del back end
const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const respuesta = await fetch(`${API_URL}/articulos`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const datos = await respuesta.json();
    console.log(datos);
  } catch (e) {}
});
window.addEventListener("scroll", () => {
  const titulo = document.querySelector(".rv-title-center");
  if (window.scrollY > 10) {
    titulo.classList.add("scrolled");
  } else {
    titulo.classList.remove("scrolled");
  }
});
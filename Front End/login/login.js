// ==========================================
// LOGIN - Esencia Uruguaya
// ==========================================
// Lista de usuarios de demo. Cuando tengas un backend real,
// reemplazá el bloque "validación" por un fetch a tu API.
const USUARIOS = [
  { usuario: "admin", password: "1234" },
  { usuario: "jonathan", password: "12345" },

  { usuario: "laura", password: "12345" },

  { usuario: "montserrat", password: "12345" },
];

const form = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

// Si ya está logueado, lo mandamos directo a la carátula
if (sessionStorage.getItem("token")) {
  window.location.href = "../index_caratula.html";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  // ---- validación ----
  // Buscamos si hay algún usuario en la lista que coincida
  const encontrado = USUARIOS.find(
    (u) => u.usuario === usuario && u.password === password,
  );

  if (encontrado) {
    // Guardamos la sesión (dura mientras la pestaña esté abierta)
    sessionStorage.setItem("token", "demo-token-123");
    sessionStorage.setItem(
      "usuario",
      JSON.stringify({ nombre: encontrado.usuario }),
    );

    mensaje.textContent = "¡Bienvenido! Redirigiendo...";
    mensaje.className = "mensaje ok";

    setTimeout(() => {
      window.location.href = "../index_caratula.html";
    }, 800);
  } else {
    mensaje.textContent = "Usuario o contraseña incorrectos.";
    mensaje.className = "mensaje error";
  }
});

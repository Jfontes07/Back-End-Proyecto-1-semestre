// ==========================================
// AUTH - Esencia Uruguaya
// Login vía popup en el nav (sin cambiar de página).
// Sesión guardada en sessionStorage: "token" + "usuario".
// ==========================================

// Usuarios de demo. Cuando haya backend real, esto se reemplaza
// por un fetch a POST /login (ver GUIA.md).
const USUARIOS = [
  { usuario: "admin", password: "1234" },
  { usuario: "rose", password: "rose123" },
  { usuario: "jonathan", password: "12345" },
  { usuario: "laura", password: "12345" },
  { usuario: "montserrat", password: "12345" },
];

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("rv-login-btn");
  const loginPop = document.getElementById("login-pop");
  const navLogin = document.getElementById("rv-nav-login");
  const navRedaccion = document.getElementById("rv-nav-redaccion");
  const form = document.getElementById("formLoginPop");
  const mensaje = document.getElementById("pop-mensaje");
  const inputUsuario = document.getElementById("pop-usuario");
  const inputPassword = document.getElementById("pop-password");

  if (!loginBtn || !loginPop || !form) return;

  // ---- Helpers de sesión ----
  function haySesion() {
    return !!sessionStorage.getItem("token");
  }

  function nombreUsuario() {
    try {
      return JSON.parse(sessionStorage.getItem("usuario"))?.nombre || "";
    } catch {
      return "";
    }
  }

  function iniciarSesion(nombre) {
    sessionStorage.setItem("token", "demo-token-" + Date.now());
    sessionStorage.setItem("usuario", JSON.stringify({ nombre }));
  }

  function cerrarSesion() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
  }

  // ---- Pintar el estado (logueado / no logueado) ----
  function actualizarUI() {
    if (haySesion()) {
      loginBtn.textContent = "Cerrar sesión (" + nombreUsuario() + ")";
      navRedaccion?.classList.remove("oculto");
      cerrarPopup();
    } else {
      loginBtn.textContent = "Iniciar sesión";
      navRedaccion?.classList.add("oculto");
    }
  }

  // ---- Popup ----
  function abrirPopup() {
    loginPop.classList.add("abierto");
    mensaje.textContent = "";
    mensaje.className = "mensaje";
    setTimeout(() => inputUsuario?.focus(), 50);
    document.addEventListener("click", cerrarPopupFuera, true);
    document.addEventListener("keydown", cerrarPopupEsc);
  }

  function cerrarPopup() {
    loginPop.classList.remove("abierto");
    form?.reset();
    document.removeEventListener("click", cerrarPopupFuera, true);
    document.removeEventListener("keydown", cerrarPopupEsc);
  }

  function cerrarPopupFuera(e) {
    if (!navLogin.contains(e.target)) cerrarPopup();
  }

  function cerrarPopupEsc(e) {
    if (e.key === "Escape") cerrarPopup();
  }

  // ---- Click en el botón: si hay sesión, desloguea; si no, abre/cierra el popup ----
  loginBtn.addEventListener("click", () => {
    if (haySesion()) {
      cerrarSesion();
      actualizarUI();
      return;
    }
    loginPop.classList.contains("abierto") ? cerrarPopup() : abrirPopup();
  });

  // El click dentro del popup no debe cerrarlo (evita que el listener "fuera" lo cierre)
  loginPop.addEventListener("click", (e) => e.stopPropagation());

  // ---- Envío del formulario ----
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = inputUsuario.value.trim();
    const password = inputPassword.value.trim();

    if (!usuario || !password) {
      mensaje.textContent = "Completá usuario y contraseña.";
      mensaje.className = "mensaje error";
      return;
    }

    const encontrado = USUARIOS.find(
      (u) => u.usuario === usuario && u.password === password,
    );

    if (encontrado) {
      iniciarSesion(encontrado.usuario);
      mensaje.textContent = "¡Bienvenido, " + encontrado.usuario + "!";
      mensaje.className = "mensaje ok";
      setTimeout(actualizarUI, 500);
    } else {
      mensaje.textContent = "Usuario o contraseña incorrectos.";
      mensaje.className = "mensaje error";
    }
  });

  // ---- Estado inicial ----
  actualizarUI();
});

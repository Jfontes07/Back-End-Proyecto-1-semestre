document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const mensajeExito = document.getElementById("mensajeExito");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (nombre === "" || correo === "" || mensaje === "") {
            if (mensajeExito) {
                mensajeExito.style.color = "red";
                mensajeExito.textContent = "Por favor completá todos los campos.";
            }
            return;
        }

        if (mensajeExito) {
            mensajeExito.style.color = "green";
            mensajeExito.textContent = "Mensaje enviado correctamente ✔";
        }

        form.reset();
    });
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
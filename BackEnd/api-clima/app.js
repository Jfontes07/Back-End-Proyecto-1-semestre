/* ── Fecha ── */
(function () {
  const MESES = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  const DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

  function mostrarFecha() {
    const d = new Date();
    const texto = `${DIAS[d.getDay()]} ${String(d.getDate()).padStart(2, "0")}/${MESES[d.getMonth()]}/${d.getFullYear()}`;
    document.getElementById("rv-fecha").textContent = texto;
  }

  mostrarFecha();
  setInterval(mostrarFecha, 60000); // actualiza cada minuto

  /* ── Temperatura — Open-Meteo (gratis, sin API key) ── */
  const COND_MAP = {
    0: "Despejado",
    1: "Casi despejado",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Niebla",
    48: "Niebla helada",
    51: "Llovizna leve",
    53: "Llovizna moderada",
    55: "Llovizna intensa",
    61: "Lluvia leve",
    63: "Lluvia moderada",
    65: "Lluvia intensa",
    71: "Nieve leve",
    73: "Nieve moderada",
    80: "Chubascos",
    81: "Chubascos moderados",
    95: "Tormenta",
  };

  const API_URL =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=-34.9011&longitude=-56.1645" +
    "&current_weather=true" +
    "&timezone=America%2FMontevideo";

  async function obtenerClima() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const cw = data.current_weather;

      document.getElementById("rv-temp").textContent =
        Math.round(cw.temperature) + "°C";
      document.getElementById("rv-cond").textContent =
        COND_MAP[cw.weathercode] || "";
    } catch (e) {
      document.getElementById("rv-temp").textContent = "N/D";
    }
  }

  obtenerClima();
  setInterval(obtenerClima, 600000); // actualiza cada 10 minutos
})();

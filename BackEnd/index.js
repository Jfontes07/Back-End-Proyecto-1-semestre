// Cargar variables de entorno — debe ser la primera línea ejecutable
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT;
const CORS_ORIGIN = (
  process.env.CORS_ORIGIN 
)
  .split(",")
  .map((origen) => origen.trim());

// Ruta del archivo donde se guardan los artículos
const ARCHIVO_DATOS = path.join(__dirname, "articulos.json");

// ── MIDDLEWARES
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// ── FUNCIONES DE LECTURA/ESCRITURA EN DISCO ──────────────
function leerArticulos() {
  // Si el archivo no existe todavía, lo creamos con un artículo de ejemplo
  if (!fs.existsSync(ARCHIVO_DATOS)) {
    const inicial = [
      {
        id: 1,
        tituloPrincipal: "Carnaval",
        subtitulo: "Subtítulo del artículo",
        fecha: "2025-01-01",
        autor: "Nombre Apellido",
        contenido: "Contenido del artículo.",
        descripcion: "Descripción breve del artículo.",
        imagen1: "",
        imagen2: "",
        idioma: "esp",
      },
    ];
    fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(inicial, null, 2), "utf-8");
  }
  const contenido = fs.readFileSync(ARCHIVO_DATOS, "utf-8");
  return JSON.parse(contenido);
}

function guardarArticulos(articulos) {
  fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(articulos, null, 2), "utf-8");
}

// ── RUTAS

// GET /articulos → todos los artículos
app.get("/articulos", (req, res) => {
  const articulos = leerArticulos();
  res.json(articulos);
});

// GET /articulos/:id → un artículo por id
app.get("/articulos/:id", (req, res) => {
  const articulos = leerArticulos();
  const id = Number(req.params.id);
  const articulo = articulos.find((a) => a.id === id);
  if (!articulo) {
    return res.status(404).json({ error: "Artículo no encontrado" });
  }
  res.json(articulo);
});

// POST /articulos → crear artículo nuevo
app.post("/articulos", (req, res) => {
  const {
    tituloPrincipal,
    subtitulo,
    fecha,
    autor,
    contenido,
    descripcion,
    imagen1,
    imagen2,
    idioma,
  } = req.body;

  if (!tituloPrincipal || !autor || !descripcion) {
    return res.status(400).json({
      error: "Los campos título, autor y descripción son obligatorios",
    });
  }

  if (idioma !== "esp" && idioma !== "ing") {
    return res.status(400).json({
      error: "El campo idioma es obligatorio y debe ser 'esp' o 'ing'",
    });
  }

  const articulos = leerArticulos();

  const proximoId =
    articulos.length > 0 ? Math.max(...articulos.map((a) => a.id)) + 1 : 1;

  const nuevo = {
    id: proximoId,
    tituloPrincipal,
    subtitulo: subtitulo || "",
    fecha: fecha || "",
    autor,
    contenido: contenido || "",
    descripcion,
    imagen1: imagen1 || "",
    imagen2: imagen2 || "",
    idioma,
  };

  articulos.push(nuevo);
  guardarArticulos(articulos);

  res.status(201).json(nuevo);
});

// ── 404 ──────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ── ERROR HANDLER ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

// ── INICIAR SERVIDOR ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

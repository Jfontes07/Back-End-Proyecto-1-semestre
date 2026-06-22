// Cargar variables de entorno — debe ser la primera línea ejecutable
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5500"  ;
// ── MIDDLEWARES ──────────────────────────────────────────
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// ── DATOS EN MEMORIA ─────────────────────────────────────
const articulos = [
  {
    id: 1,
    tituloPrincipal: "Carnaval",
    subtitulo: "Subtítulo del artículo",
    fecha: "2025-01-01",
    autor: "Nombre Apellido",
    contenido: "Contenido del artículo.",
    descripcion: "Descripción breve del artículo.",
  },
];

// ── RUTAS ────────────────────────────────────────────────

// GET /articulos → todos los artículos
app.get("/articulos", (req, res) => {
  res.json(articulos);
});

// GET /articulos/:id → un artículo por id
app.get("/articulos/:id", (req, res) => {
  const id = Number(req.params.id);
  const articulo = articulos.find((a) => a.id === id);
  if (!articulo) {
    return res.status(404).json({ error: "Artículo no encontrado" });
  }
  res.json(articulo);
});

// POST /articulos → crear artículo nuevo
app.post("/articulos", (req, res) => {
  const { tituloPrincipal, subtitulo, fecha, autor, contenido, descripcion } =
    req.body;

  // Validación de campos obligatorios
  if (!tituloPrincipal || !autor || !descripcion) {
    return res.status(400).json({
      error: "Los campos título, autor y descripción son obligatorios",
    });
  }

  const nuevo = {
    id: articulos.length + 1,
    tituloPrincipal,
    subtitulo: subtitulo || "",
    fecha: fecha || "",
    autor,
    contenido: contenido || "",
    descripcion,
  };

  articulos.push(nuevo);
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

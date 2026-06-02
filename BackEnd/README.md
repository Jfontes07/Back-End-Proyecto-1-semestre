# Revista Digital — Back End

API REST con Node.js y Express.

## Instalación

```
npm install
```

## Configuración

Copiar .env.example a .env y completar los valores:

```
cp .env.example .env
```

## Correr el servidor

```
npm run dev
```

## Rutas

| Método | Ruta           | Descripción                  |
| ------ | -------------- | ---------------------------- |
| GET    | /articulos     | Devuelve todos los articulos |
| GET    | /articulos/:id | Devuelve un artículo por id  |
| POST   | /articulos     | Crea un artículo nuevo       |

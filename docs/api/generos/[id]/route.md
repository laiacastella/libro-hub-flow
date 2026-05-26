# Género por ID

Obtiene los datos de un género específico.

## Endpoint

```
GET /api/generos/[id]
```

## Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | number | ID del género |

## Ejemplo

```javascript
const res = await fetch("/api/generos/3");
const genero = await res.json();
```

## Respuestas

| Status | Descripción |
|--------|-------------|
| 200 | Datos del género |
| 404 | Género no encontrado |
| 500 | Error interno del servidor |

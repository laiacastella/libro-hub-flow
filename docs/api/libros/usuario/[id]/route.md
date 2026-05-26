# Libros por Usuario (por ID)

Obtiene todos los libros de un usuario específico.

## Endpoint

```
GET /api/libros/usuario/[id]
```

## Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | number | ID del usuario |

## Query Parameters

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| solo_disponibles | boolean | false | Filtrar solo libros disponibles |

## Ejemplo

```javascript
// Todos los libros del usuario 5
const res = await fetch("/api/libros/usuario/5");
const libros = await res.json();

// Solo libros disponibles
const res = await fetch("/api/libros/usuario/5?solo_disponibles=true");
const libros = await res.json();
```

## Respuestas

| Status | Descripción |
|--------|-------------|
| 200 | Array de libros del usuario |
| 500 | Error interno del servidor |

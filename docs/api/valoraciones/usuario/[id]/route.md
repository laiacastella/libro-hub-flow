# Valoraciones por Usuario (por ID)

Obtiene todas las valoraciones recibidas por un usuario.

## Endpoint

```
GET /api/valoraciones/usuario/[id]
```

## Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | number | ID del usuario evaluado |

## Campos devueltos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id_valoracion | number | ID de la valoración |
| id_usuario_evaluador | number | ID del usuario que valora |
| puntuacion | number | Puntuación (1-5) |
| valoracion | string | Comentario de la valoración |
| fecha_valoracion | string | Fecha de la valoración |
| nick_usuario | string | Nick del evaluador |
| foto_perfil | string | Foto del evaluador |

## Ejemplo

```javascript
const res = await fetch("/api/valoraciones/usuario/5");
const valoraciones = await res.json();
```

## Respuestas

| Status | Descripción |
|--------|-------------|
| 200 | Array de valoraciones |
| 400 | ID de usuario no válido |
| 500 | Error interno del servidor |

# Usuario por ID

Obtiene los datos completos de un usuario específico.

## Endpoint

```
GET /api/usuarios/[id]
```

## Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | number | ID del usuario |

## Campos devueltos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id_usuario | number | ID único del usuario |
| nick_usuario | string | Nombre de usuario |
| email | string | Correo electrónico |
| nombre | string | Nombre |
| apellidos | string | Apellidos |
| foto_perfil | string | URL de la foto de perfil |
| telefono | string | Teléfono |
| codigo_postal | string | Código postal |
| puntuacion_promedio | number | Puntuación promedio |
| provincia | string | Nombre de la provincia |
| poblacion | string | Nombre de la población |

## Ejemplo

```javascript
const res = await fetch("/api/usuarios/5");
const usuario = await res.json();
```

## Respuestas

| Status | Descripción |
|--------|-------------|
| 200 | Datos del usuario |
| 404 | Usuario no encontrado |
| 500 | Error interno del servidor |

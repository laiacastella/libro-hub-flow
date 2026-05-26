# Actualizar Foto de Perfil

Actualiza la foto de perfil de un usuario.

## Endpoint

```
POST /api/usuarios/foto
```

## Body (JSON)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id_usuario | number | **Requerido.** ID del usuario |
| foto_perfil | string | **Requerido.** URL de la nueva foto |

## Ejemplo

```javascript
const res = await fetch("/api/usuarios/foto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        id_usuario: 5,
        foto_perfil: "https://freeimage.host/i/abc123"
    }),
});

const data = await res.json();
console.log(data.success); // true
```

## Respuestas

| Status | Descripción |
|--------|-------------|
| 200 | Foto actualizada correctamente |
| 400 | Falta id_usuario o foto_perfil |
| 500 | Error interno del servidor |

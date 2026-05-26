# Actualizar Usuario

Actualiza los datos de un usuario existente.

## Endpoint

```
POST /api/usuarios/actualizar
```

## Body (JSON)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id_usuario | number | **Requerido.** ID del usuario a actualizar |
| password | string | Nueva contraseña (opcional) |
| nick_usuario | string | Nuevo nombre de usuario |
| email | string | Nuevo correo electrónico |
| nombre | string | Nuevo nombre |
| apellidos | string | Nuevos apellidos |
| telefono | string | Nuevo teléfono |
| id_provincia | number | ID de la provincia |
| id_poblacion | number | ID de la población |
| codigo_postal | string | Nuevo código postal |
| repPassword | string | **Ignorado.** Repetición de contraseña |

## Validaciones

- No permite nick o email duplicados de otros usuarios
- Campos vacíos o nulos se eliminan antes de actualizar
- Si no hay campos para actualizar, devuelve error 400

## Ejemplo

```javascript
const res = await fetch("/api/usuarios/actualizar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        id_usuario: 5,
        nombre: "Juan",
        email: "juan@nuevo.com"
    }),
});

const data = await res.json();
console.log(data.success); // true
```

## Respuestas

| Status | Descripción |
|--------|-------------|
| 200 | Usuario actualizado correctamente |
| 400 | Falta id_usuario, nick/email en uso, o sin campos |
| 500 | Error interno del servidor |

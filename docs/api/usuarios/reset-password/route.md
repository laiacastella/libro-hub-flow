# Restablecer Contraseña

Restablece la contraseña usando un token válido.

## Endpoint

```
POST /api/usuarios/reset-password
```

## Body (JSON)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| token | string | **Requerido.** Token de restablecimiento |
| password_hash | string | **Requerido.** Nueva contraseña (en texto plano, se hasherea) |

## Proceso

1. Valida el token y que no haya expirado
2. Hashea la nueva contraseña
3. Actualiza el usuario y limpia el token

## Ejemplo

```javascript
const res = await fetch("/api/usuarios/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        token: "abc123-uuid-token",
        password_hash: "miNuevaContrasena123"
}),
});

const data = await res.json();
console.log(data.message); // "Contraseña actualizada correctamente"
```

## Respuestas

| Status | Descripción |
|--------|-------------|
| 200 | Contraseña actualizada correctamente |
| 400 | Token inválido o expirado, o datos incompletos |
| 500 | Error interno del servidor |

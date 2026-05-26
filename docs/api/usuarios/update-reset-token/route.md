# Actualizar Token de Restablecimiento

Actualiza el token y expiración para un email específico.

## Endpoint

```
POST /api/usuarios/update-reset-token
```

## Body (JSON)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| email | string | **Requerido.** Email del usuario |
| token | string | **Requerido.** Nuevo token |
| expira | string | **Requerido.** Fecha de expiración (formato ISO) |

## Ejemplo

```javascript
const res = await fetch("/api/usuarios/update-reset-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: "usuario@ejemplo.com",
        token: "nuevo-token-uuid",
        expira: "2025-05-26 12:30:00"
    }),
});

const data = await res.json();
console.log(data.ok); // true
```

## Respuestas

| Status | Descripción |
|--------|-------------|
| 200 | Token actualizado correctamente |
| 500 | Error interno del servidor |

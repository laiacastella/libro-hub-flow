# Validar Token de Restablecimiento

Verifica si un token de restablecimiento de contraseña es válido.

## Endpoint

```
POST /api/usuarios/validate-reset-token
```

## Body (JSON)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| token | string | **Requerido.** Token a validar |

## Ejemplo

```javascript
const res = await fetch("/api/usuarios/validate-reset-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: "abc123-uuid-token" }),
});

const data = await res.json();
console.log(data.valid); // true o false
```

## Respuestas

| Status | Descripción |
|--------|-------------|
| 200 | Token válido |
| 400 | Token inválido o expirado |

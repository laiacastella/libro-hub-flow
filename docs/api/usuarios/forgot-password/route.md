# Olvidé mi Contraseña

Envía un email con enlace para restablecer la contraseña.

## Endpoint

```
POST /api/usuarios/forgot-password
```

## Body (JSON)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| email | string | **Requerido.** Email del usuario |

## Proceso

1. Busca el usuario por email
2. Genera un token UUID seguro
3. Guarda el token con expiración de 30 minutos
4. Envía email con enlace de restablecimiento

## Ejemplo

```javascript
const res = await fetch("/api/usuarios/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "usuario@ejemplo.com" }),
});

const data = await res.json();
console.log(data.message); // "Email enviado correctamente"
```

## Respuestas

| Status | Descripción |
|--------|-------------|
| 200 | Email enviado (o usuario no existe - se muestra el mismo mensaje por seguridad) |
| 400 | Email requerido |
| 500 | Error interno del servidor |

## Seguridad

Sempre devuelve "Email enviado correctamente" aunque el email no exista, para no revelar qué emails están registrados.

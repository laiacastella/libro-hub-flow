# GET /api/check-email

Verifica si un email está disponible para registro.

## Query params

- `email` - Email a verificar (obligatorio)

## Ejemplo

```
GET /api/check-email?email=usuario@ejemplo.com
```

## Respuesta

```json
{ "disponible": true }
```

- `disponible: true` → El email NO existe en la BD, se puede usar
- `disponible: false` → El email YA existe, no se puede registrar
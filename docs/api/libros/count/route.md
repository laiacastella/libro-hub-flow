# GET /api/libros/count

Cuenta los libros de un usuario.

## Query params

- `user` - ID del usuario (obligatorio)

## Respuesta

```json
{
  "total": 12
}
```

## Estados de respuesta

- 200: `{ "total": number }`
- 400: `{ "error": "Falta user" }`
- 500: `{ "error": "Error BBDD" }`
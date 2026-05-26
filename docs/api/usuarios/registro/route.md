# GET /api/usuarios/registro

Lista todos los usuarios (solo desarrollo).

## Respuesta

```json
[
  { "id_usuario": 1, "nick_usuario": "...", "email": "..." },
  ...
]
```

## Estados de respuesta

- 200: Array de usuarios
- 500: `{ "error": "Error BBDD" }`
# GET /api/provincias

Lista todas las provincias.

## Respuesta

```json
[
  { "id_provincia": 1, "provincia": "Madrid" },
  { "id_provincia": 2, "provincia": "Barcelona" }
]
```

## Estados de respuesta

- 200: Array de provincias
- 500: `{ "error": "Error BBDD" }`
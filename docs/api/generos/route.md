# GET /api/generos

Lista todos los géneros disponibles.

## Respuesta

```json
[
  { "id": 1, "nombre": "Novela" },
  { "id": 2, "nombre": "Ciencia Ficción" },
  { "id": 3, "nombre": "Misterio" }
]
```

## Estados de respuesta

- 200: Array de géneros ordenados alfabéticamente
- 500: `{ "error": "Error en la base de datos" }`
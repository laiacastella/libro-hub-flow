# GET /api/poblaciones

Lista poblaciones de una provincia.

## Query params

- `id_provincia` - ID de provincia (obligatorio)

## Ejemplo

```
GET /api/poblaciones?id_provincia=1
```

## Respuesta

```json
[
  { "id_poblacion": 1, "poblacion": "Madrid" },
  { "id_poblacion": 2, "poblacion": "Alcalá de Henares" }
]
```

## Estados de respuesta

- 200: Array de poblaciones (vacío si no hay provincia)
- 500: `{ "error": "Error BBDD" }`
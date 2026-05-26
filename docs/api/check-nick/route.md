# GET /api/check-nick

Verifica si un nick de usuario está disponible.

## Query params

- `nick` - Nick a verificar (obligatorio)

## Ejemplo

```
GET /api/check-nick?nick=mi_nick
```

## Respuesta

```json
{ "disponible": true }
```

- `disponible: true` → El nick NO existe en la BD, se puede usar
- `disponible: false` → El nick YA existe, no se puede usar
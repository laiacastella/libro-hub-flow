# PUT /api/intercambios/fecha

Cierra un intercambio estableciendo la fecha de cierre.

## Archivo fuente

- `app/api/intercambios/fecha/route.js`

## Body

```json
{
  "id_intercambio": 123
}
```

## Comportamiento

1. Busca el intercambio por ID
2. Establece `fecha_cierre = NOW()`

## Respuestas

- 200: `{ "message": "Intercambio cerrado correctamente" }`
- 400: `{ "error": "Falta id_intercambio" }`
- 404: `{ "error": "Intercambio no encontrado" }`
- 500: `{ "error": "Error BBDD" }`
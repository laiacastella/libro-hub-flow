# API Intercambios Estado Comun

Documentacion de la ruta PATCH /api/intercambios/estado/comun.

## Archivo fuente

- app/api/intercambios/estado/comun/route.js

## PATCH /api/intercambios/estado/comun

Actualiza el mismo estado para ambas columnas de estado del intercambio.

### Body requerido

```json
{
  "id_intercambio": 123,
  "estado": "rechazado"
}
```

### Reglas aplicadas

1. Si faltan datos, devuelve 400.
2. Si estado = aceptado, exige que exista id_libro_ofrecido.
3. Actualiza en una sola query:
   - estado_usuario_envia = estado
   - estado_usuario_recibe = estado
4. Si no existe el intercambio (affectedRows = 0), devuelve 404.

### Respuestas

- 200: { "ok": true }
- 400: { "error": "Faltan datos" }
- 400: { "error": "Debes seleccionar un libro ofrecido antes de aceptar el intercambio" }
- 404: { "error": "Intercambio no encontrado" }
- 500: { "error": "Error al actualizar estado comun" }

### Nota tecnica

El endpoint escribe un log con el intercambio actualizado.

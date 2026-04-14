# API Intercambios Estado Individual

Documentacion de la ruta PATCH /api/intercambios/estado/individual.

## Archivo fuente

- app/api/intercambios/estado/individual/route.js

## PATCH /api/intercambios/estado/individual

Actualiza el estado de una sola columna del intercambio segun quien realiza la accion.

### Body requerido

```json
{
  "id_intercambio": 123,
  "estado": "aceptado",
  "id_usuario_actual": 34
}
```

### Reglas aplicadas

1. Si falta algun dato requerido, devuelve 400.
2. Si estado = aceptado, exige que exista id_libro_ofrecido.
3. Busca el intercambio por id_intercambio.
4. Decide la columna a actualizar:
   - Si id_usuario_actual coincide con id_usuario_solicitante:
     - actualiza estado_usuario_envia
   - En caso contrario:
     - actualiza estado_usuario_recibe
5. Si no existe el intercambio, devuelve 404.

### Respuestas

- 200: { "ok": true }
- 400: { "error": "Faltan datos" }
- 400: { "error": "Debes seleccionar un libro ofrecido antes de aceptar el intercambio" }
- 404: { "error": "Intercambio no encontrado" }
- 500: { "error": "Error al actualizar estado individual" }

### Nota tecnica

El endpoint escribe un log con:

- columnaActualizada
- intercambio (snapshot de estados tras la operacion)

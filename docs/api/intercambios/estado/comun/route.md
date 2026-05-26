# PATCH /api/intercambios/estado/comun

Actualiza el estado de ambos usuarios a la vez en un intercambio.

## Archivo fuente

- `app/api/intercambios/estado/comun/route.js`

## Body

```json
{
  "id_intercambio": 123,
  "estado": "aceptado"
}
```

## Estados disponibles

| Estado | Comportamiento |
|--------|----------------|
| `solicitado` | Estado inicial |
| `seleccionado` | Después de elegir libro |
| `aceptado` | Ambos aceptan (requiere libro ofrecido) |
| `rechazado` | Rechazar intercambio |
| `finalizado` | Marcar como finalizado |
| `eliminado` | Eliminar intercambio |

## Comportamiento

### Si estado = "aceptado"

1. Valida que el intercambio tenga `id_libro_ofrecido` asignado
2. Actualiza ambos estados (`estado_usuario_envia` y `estado_usuario_recibe`) a `aceptado`
3. Marca ambos libros como `reservado`
4. Rechaza automáticamente otros intercambios que involucren estos libros
5. Envía email al solicitante notificando aceptación

### Si estado = "rechazado"

1. Actualiza ambos estados a `rechazado`
2. Envía email al solicitante notificando rechazo

### Otros estados

1. Solo actualiza el estado del intercambio

## Validaciones

- Si `estado = "aceptado"` y no hay libro ofrecido → 400 error

## Respuestas

- 200: `{ "ok": true }`
- 400: `{ "error": "Faltan datos" }`
- 400: `{ "error": "Debes seleccionar un libro ofrecido antes de aceptar el intercambio" }`
- 404: `{ "error": "Intercambio no encontrado" }`
- 500: `{ "error": "Error al actualizar estado comun" }`
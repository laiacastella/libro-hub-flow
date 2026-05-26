# POST /api/intercambios/problema

Reporta un problema con un intercambio, permitiendo cerrar o revertir.

## Archivo fuente

- `app/api/intercambios/problema/route.js`

## Body

```json
{
  "id_intercambio": 123,
  "id_usuario_reporta": 45,
  "tipo_accion": "revertir",
  "descripcion": "El libro llegó en mal estado",
  "valoracion": {
    "id_usuario_evaluador": 45,
    "id_usuario_evaluado": 12,
    "puntuacion": 2,
    "valoracion": "Libro en malas condiciones"
  }
}
```

## Tipos de acción

| Acción | Descripción |
|--------|-------------|
| `revertir` | El usuario que reporta marca su parte como rechazada y libera su libro |
| `cerrar` | El usuario marca su parte como finalizada y archiva su libro |

## Comportamiento

### Si tipo_accion = "revertir"

1. Actualiza estado del usuario que reporta a `rechazado`
2. Libera el libro del usuario (disponibilidad = `disponible`)

### Si tipo_accion = "cerrar"

1. Actualiza estado del usuario que reporta a `finalizado`
2. Archiva el libro del usuario (disponibilidad = `archivado`)

### Si se incluye valoracion

1. Inserta la valoración en la base de datos

## Validaciones

- El usuario debe ser participante del intercambio
- El intercambio no debe estar ya finalizado o rechazado para ese usuario

## Respuestas

- 200: `{ "ok": true, "message": "...", "libro_liberado": "...", "mi_estado": "..." }`
- 400: `{ "error": "Faltan datos requeridos" }`
- 400: `{ "error": "Tu parte del intercambio ya está finalizada" }`
- 403: `{ "error": "No tienes permiso para reportar este intercambio" }`
- 404: `{ "error": "Intercambio no encontrado" }`
- 500: `{ "error": "Error al procesar el reporte" }`
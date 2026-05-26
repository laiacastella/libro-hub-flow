# API Incidencias

Documentación de la ruta `/api/incidencia`.

## Archivo fuente

- `app/api/incidencia/route.js`

## Mapa de endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/incidencia | Registra una nueva incidencia |

---

## POST /api/incidencia

Envía un formulario de incidencia que se guarda en BD y envía email a librohubflow@gmail.com.

### Body

```json
{
  "nombreCompleto": "Juan García",
  "correoElectronico": "juan@email.com",
  "telefono": "123456789",
  "tipoIncidencia": "Problema con intercambio",
  "asunto": "No recibí el libro",
  "descripcion": "Detalles del problema...",
  "capturaUrl": "https://..."
}
```

### Campos requeridos

- nombreCompleto
- correoElectronico
- tipoIncidencia
- asunto
- descripcion

### Campos opcionales

- telefono
- capturaUrl

### Comportamiento

1. Valida campos requeridos
2. Inserta en tabla `incidencias` con estado "pendiente"
3. Envía email a librohubflow@gmail.com con los datos
4. Si el email falla, la incidencia se guarda igual (no falla la operación)

### Respuestas

- 200: `{ "message": "Incidencia registrada correctamente" }`
- 400: `{ "error": "Faltan campos requeridos" }`
- 500: `{ "error": "Error interno del servidor" }`
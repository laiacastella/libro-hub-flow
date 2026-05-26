# API Valoraciones

Documentación de todas las rutas bajo `/api/valoraciones`.

## Estructura en código

- `/api/valoraciones` - Crear valoración
- `/api/valoraciones/[id]` - Detalle de una valoración
- `/api/valoraciones/usuario/[id]` - Valoraciones de un usuario

## Mapa de endpoints

| Método | Ruta | Archivo route.js |
|--------|------|------------------|
| POST | /api/valoraciones | app/api/valoraciones/route.js |
| GET | /api/valoraciones/[id] | app/api/valoraciones/[id]/route.js |
| GET | /api/valoraciones/usuario/[id] | app/api/valoraciones/usuario/[id]/route.js |

---

## POST /api/valoraciones

Crea una valoración para un intercambio completado.

### Body

```json
{
  "id_intercambio": 123,
  "id_usuario_evaluador": 5,
  "id_usuario_evaluado": 10,
  "puntuacion": 5,
  "valoracion": "Excelente trato y libro en perfectas condiciones."
}
```

### Validaciones

- `puntuacion` debe ser integer entre 1 y 5
- `valoracion` no puede estar vacía
- Un usuario no puede evaluarse a sí mismo
- Solo los participantes del intercambio pueden valorar
- Solo se puede valorar una vez por intercambio

### Comportamiento

1. Verifica que el intercambio exista
2. Verifica que ambos usuarios sean participantes
3. Verifica que no exista una valoración previa del mismo evaluador
4. Inserta la valoración
5. Recalcula `puntuacion_promedio` del usuario evaluado
6. Envía email de notificación al evaluado

### Respuestas

- 201: `{ "success": true }`
- 400: `{ "error": "Faltan datos para registrar la valoracion" }`
- 400: `{ "error": "La puntuacion debe estar entre 1 y 5" }`
- 400: `{ "error": "La valoracion es obligatoria" }`
- 400: `{ "error": "No puedes evaluarte a ti mismo" }`
- 403: `{ "error": "Solo los usuarios del intercambio pueden valorar" }`
- 404: `{ "error": "Intercambio no encontrado" }`
- 409: `{ "error": "Ya has valorado este intercambio" }`
- 500: `{ "error": "Error al guardar la valoracion" }`
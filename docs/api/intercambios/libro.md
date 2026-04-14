# API Intercambios Libro

Documentacion de la ruta PATCH /api/intercambios/libro.

## Archivo fuente

- app/api/intercambios/libro/route.js

## PATCH /api/intercambios/libro

Asigna el libro ofrecido a un intercambio y cambia el estado de ambas partes a seleccionado.

### Body requerido

```json
{
  "id_intercambio": 123,
  "id_libro_ofrecido": 789
}
```

### Reglas aplicadas

- Si falta id_intercambio o id_libro_ofrecido, devuelve 400.
- Actualiza:
  - id_libro_ofrecido = valor recibido
  - estado_usuario_envia = seleccionado
  - estado_usuario_recibe = seleccionado
- Si no existe el intercambio (affectedRows = 0), devuelve 404.

### Respuestas

- 200: { "ok": true }
- 400: { "error": "Faltan datos" }
- 404: { "error": "Intercambio no encontrado" }
- 500: { "error": "Error al actualizar libro ofrecido" }

### Nota tecnica

El endpoint escribe un log:

- PATCH /api/intercambios/libro

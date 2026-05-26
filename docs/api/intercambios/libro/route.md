# PATCH /api/intercambios/libro

Asigna el libro ofrecido a un intercambio y cambia el estado de ambos usuarios a "seleccionado".

## Archivo fuente

- `app/api/intercambios/libro/route.js`

## Body

```json
{
  "id_intercambio": 123,
  "id_libro_ofrecido": 789
}
```

### Campos requeridos

- `id_intercambio` - ID del intercambio
- `id_libro_ofrecido` - ID del libro que el solicitante ofrece a cambio

## Comportamiento

1. Actualiza `id_libro_ofrecido` en el intercambio
2. Cambia `estado_usuario_envia` = `seleccionado`
3. Cambia `estado_usuario_recibe` = `seleccionado`

## Respuestas

- 200: `{ "ok": true }`
- 400: `{ "error": "Faltan datos" }`
- 404: `{ "error": "Intercambio no encontrado" }`
- 500: `{ "error": "Error al actualizar libro ofrecido" }`
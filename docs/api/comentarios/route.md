# API Comentarios

Documentación de todas las rutas bajo `/api/comentarios`.

## Archivo fuente

- `app/api/comentarios/route.js`

## Mapa de endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/comentarios | Lista comentarios de un libro |
| POST | /api/comentarios | Crea un nuevo comentario |
| PUT | /api/comentarios | Edita un comentario |
| DELETE | /api/comentarios | Elimina un comentario |

---

## GET /api/comentarios

Obtiene todos los comentarios de un libro específico.

### Query params

- `id_libro` - ID del libro (obligatorio)

### Ejemplo

```
GET /api/comentarios?id_libro=123
```

### Respuesta

```json
{
  "data": [
    {
      "id_comentario": 1,
      "id_usuario": 5,
      "id_libro": 123,
      "comentario": "Excelente libro, lo recomiendo mucho.",
      "fecha_comentario": "2026-05-20 14:30:00",
      "nick_usuario": "lectura_fan",
      "foto_perfil": "https://..."
    }
  ]
}
```

### Posibles respuestas

- 200: `{ "data": [...] }`
- 500: `{ "error": "Error al obtener comentarios" }`

---

## POST /api/comentarios

Crea un nuevo comentario en un libro.

### Body

```json
{
  "id_libro": 123,
  "id_usuario": 5,
  "comentario": "Este libro me pareció increíble.",
  "fecha_comentario": "2026-05-26 10:00:00"
}
```

### Notas

- `fecha_comentario` es opcional; si no se proporciona, se usa `NOW()`
- El formato debe ser `YYYY-MM-DD HH:MM:SS`

### Validaciones

- `comentario` no puede estar vacío
- `id_libro` e `id_usuario` deben ser números válidos (> 0)

### Respuestas

- 201: `{ "success": true, "comentario": {...} }`
- 400: `{ "error": "El comentario es obligatorio" }`
- 400: `{ "error": "Faltan id_libro o id_usuario válidos" }`
- 500: `{ "error": "Error al crear comentario" }`

---

## PUT /api/comentarios

Edita el texto de un comentario existente. Solo el autor puede editar.

### Body

```json
{
  "id_comentario": 1,
  "id_usuario": 5,
  "comentario": "Texto actualizado del comentario."
}
```

### Validaciones

- El usuario debe ser el autor del comentario
- El comentario no puede estar vacío

### Respuestas

- 200: `{ "success": true, "comentario": {...} }`
- 400: `{ "error": "Faltan id_comentario o id_usuario válidos" }`
- 400: `{ "error": "El comentario es obligatorio" }`
- 403: `{ "error": "No tienes permiso para editar este comentario" }`
- 500: `{ "error": "Error al actualizar comentario" }`

---

## DELETE /api/comentarios

Elimina un comentario. Solo el autor puede eliminar.

### Body

```json
{
  "id_comentario": 1,
  "id_usuario": 5
}
```

### Validaciones

- El usuario debe ser el autor del comentario

### Respuestas

- 200: `{ "success": true, "id_comentario": 1 }`
- 400: `{ "error": "Faltan id_comentario o id_usuario válidos" }`
- 403: `{ "error": "No tienes permiso para eliminar este comentario" }`
- 404: `{ "error": "Comentario no encontrado" }`
- 500: `{ "error": "Error al eliminar comentario" }`
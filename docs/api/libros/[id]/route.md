# GET /api/libros/[id]

Obtiene detalle completo de un libro.

## Parámetros

- `id` - ID del libro (path parameter)

## Respuesta

```json
{
  "id_libro": 1,
  "titulo": "Cien años de soledad",
  "autor": "Gabriel García Márquez",
  "descripcion": "...",
  "foto_portada": "https://...",
  "tipo_genero": "Novela",
  "estado_fisico": "nuevo",
  "disponibilidad": "disponible",
  "nick_usuario": "lectura_fan",
  "puntuacion_promedio": 4.5,
  "foto_perfil": "https://..."
}
```

## Estados de respuesta

- 200: Datos del libro
- 404: `{ "error": "Libro no encontrado" }`
- 500: `{ "error": "Error BBDD" }`
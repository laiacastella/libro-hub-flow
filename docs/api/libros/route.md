# API Libros

Documentación de todas las rutas bajo `/api/libros`.

## Estructura real en código

- `/api/libros` - Listado paginado con búsqueda
- `/api/libros/[id]` - Detalle, actualización
- `/api/libros/count` - Contador de libros por usuario
- `/api/libros/usuario/[id]` - Libros de un usuario específico

## Mapa de endpoints

| Método | Ruta | Archivo route.js |
|--------|------|------------------|
| GET | /api/libros | app/api/libros/route.js |
| GET | /api/libros/[id] | app/api/libros/[id]/route.js |
| PUT | /api/libros/[id] | app/api/libros/[id]/route.js |
| GET | /api/libros/count | app/api/libros/count/route.js |
| GET | /api/libros/usuario/[id] | app/api/libros/usuario/[id]/route.js |

---

## GET /api/libros

Lista libros con paginación y búsqueda opcional.

### Query params

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| page | number | Página (default: 1) |
| limit | number | Items por página (default: 6) |
| search | string | Búsqueda por título o autor |
| user | number | Filtrar por usuario específico |
| solo_disponibles | boolean | Si `true`, solo muestra disponibles |

### Respuesta

```json
{
  "page": 1,
  "limit": 6,
  "totalPaginas": 5,
  "totalItems": 28,
  "data": [
    {
      "id_libro": 1,
      "titulo": "Cien años de soledad",
      "autor": "Gabriel García Márquez",
      "foto_portada": "https://...",
      "disponibilidad": "disponible"
    }
  ]
}
```

### Estados de disponibilidad

- `disponible` - Libro disponible para intercambio
- `reservado` - Libro con intercambio activo
- `archivado` - Libro ocultado (no se muestra en lista)

---

## GET /api/libros/[id]

Obtiene detalle completo de un libro.

### Parámetros

- `id` - ID del libro (path parameter)

### Respuesta

```json
{
  "id_libro": 1,
  "titulo": "Cien años de soledad",
  "autor": "Gabriel García Márquez",
  "descripcion": "Descripción del libro...",
  "foto_portada": "https://...",
  "id_genero": 1,
  "tipo_genero": "Novela",
  "estado_fisico": "nuevo",
  "disponibilidad": "disponible",
  "id_usuario": 5,
  "nick_usuario": "lectura_fan",
  "puntuacion_promedio": 4.5,
  "foto_perfil": "https://..."
}
```

### Posibles respuestas

- 200: Datos del libro
- 404: `{ "error": "Libro no encontrado" }`
- 500: `{ "error": "Error BBDD" }`

---

## PUT /api/libros/[id]

Actualiza los datos de un libro.

### Body requerido

```json
{
  "titulo": "Nuevo título",
  "autor": "Nuevo autor",
  "descripcion": "Nueva descripción",
  "id_genero": 2,
  "estado_fisico": "usado",
  "foto_portada": "https://nueva-foto.jpg"
}
```

### Campos obligatorios

- titulo
- autor
- id_genero
- estado_fisico

### Respuestas

- 200: `{ "success": true, "message": "Libro actualizado correctamente" }`
- 400: `{ "error": "Asegúrate de que todos los campos obligatorios están llenos." }`
- 404: `{ "error": "No se encontró el libro para actualizar" }`
- 500: `{ "error": "Error interno al guardar en la BBDD" }`

---

## GET /api/libros/count

Cuenta los libros de un usuario.

### Query params

- `user` - ID del usuario (obligatorio)

### Respuesta

```json
{
  "total": 12
}
```

### Posibles respuestas

- 200: `{ "total": number }`
- 400: `{ "error": "Falta user" }`
- 500: `{ "error": "Error BBDD" }`
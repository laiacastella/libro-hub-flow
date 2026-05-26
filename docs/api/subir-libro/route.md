# API Subir Libro

Documentación de la ruta `/api/subir-libro`.

## Archivo fuente

- `app/api/subir-libro/route.js`

## Mapa de endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/subir-libro | Registra un nuevo libro |

---

## POST /api/subir-libro

Registra un nuevo libro en la plataforma.

### Body

```json
{
  "id_usuario": 123,
  "titulo": "Cien años de soledad",
  "autor": "Gabriel García Márquez",
  "foto_portada": "https://url-de-imagen.jpg",
  "estado_fisico": "nuevo",
  "descripcion": "Libro en excelentes condiciones",
  "id_genero": 1
}
```

### Campos requeridos

- id_usuario
- titulo
- autor
- id_genero
- estado_fisico

### Valores de estado_fisico

- `nuevo` - Como nuevo
- `muyBueno` - Muy bueno
- `bueno` - Bueno
- `aceptable` - Aceptable

### Comportamiento

- El libro se crea con `disponibilidad = "disponible"`
- `fecha_publicacion` se establece automáticamente a la fecha actual

### Respuestas

- 200: `{ "success": true, "id_libro": 123, "message": "¡Libro publicado con éxito en LibroHubFlow!" }`
- 400: `{ "success": false, "error": "Faltan campos obligatorios para registrar el libro" }`
- 500: `{ "success": false, "error": "Error interno al procesar el registro en la base de datos" }`
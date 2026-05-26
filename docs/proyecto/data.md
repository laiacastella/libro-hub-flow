# Carpeta data/

La carpeta `data/` contiene archivos JSON con datos estáticos usados por la aplicación.

## Archivos

| Archivo | Descripción | Uso |
|---------|-------------|-----|
| `libros.json` | Catálogo inicial de libros | Datos de ejemplo/seed |
| `reseñas.json` | Reseñas de ejemplo | Datos de ejemplo |

## Estructura de libros.json

```json
[
  {
    "id": 1,
    "titulo": "Título del libro",
    "autor": "Nombre del autor",
    "isbn": "978-3-16-148410-0",
    "descripcion": "Sinopsis del libro...",
    "id_genero": 1,
    "id_usuario": 5,
    "foto": "url-de-la-imagen.jpg",
    "disponibilidad": "disponible"
  }
]
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | number | ID único del libro |
| `titulo` | string | Título del libro |
| `autor` | string | Autor del libro |
| `isbn` | string | ISBN (opcional) |
| `descripcion` | string | Sinopsis |
| `id_genero` | number | ID del género |
| `id_usuario` | number | ID del propietario |
| `foto` | string | URL de la portada |
| `disponibilidad` | string | Estado: disponible, no_disponible, eliminado |

## Estructura de reseñas.json

```json
[
  {
    "id": 1,
    "id_libro": 1,
    "id_usuario": 5,
    "texto": "Excelente libro...",
    "puntuacion": 5,
    "fecha": "2025-01-15"
  }
]
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | number | ID único de la reseña |
| `id_libro` | number | ID del libro reseñado |
| `id_usuario` | number | ID del usuario que reseña |
| `texto` | string | Contenido de la reseña |
| `puntuacion` | number | Puntuación (1-5) |
| `fecha` | string | Fecha de la reseña |

## Uso

Estos archivos se usan para:
- Población inicial de la base de datos
- Datos de ejemplo en desarrollo
- Testing

En producción, los datos principales vienen de la base de datos MySQL.

# API Intercambios

Documentación de la ruta base y del árbol de endpoints bajo `/api/intercambios`.

## Estructura en código

- `/api/intercambios` - Ruta base (GET, POST)
- `/api/intercambios/confirmar-email` - Confirmar entrega
- `/api/intercambios/fecha` - Cerrar intercambio
- `/api/intercambios/finalizados` - Contar intercambios finalizados
- `/api/intercambios/libro` - Asignar libro ofrecido
- `/api/intercambios/problema` - Reportar problema/cerrar/revertir
- `/api/intercambios/estado/individual` - Actualizar estado individual
- `/api/intercambios/estado/comun` - Actualizar estado común

## Mapa de endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/intercambios | Lista intercambios |
| POST | /api/intercambios | Crear solicitud |
| GET | /api/intercambios/confirmar-email | Confirmar entrega |
| PUT | /api/intercambios/fecha | Cerrar intercambio |
| GET | /api/intercambios/finalizados | Contar finalizados |
| PATCH | /api/intercambios/libro | Asignar libro ofrecido |
| POST | /api/intercambios/problema | Reportar problema |
| PATCH | /api/intercambios/estado/individual | Estado individual |
| PATCH | /api/intercambios/estado/comun | Estado común |

---

## GET /api/intercambios

Lista todos los intercambios con información enriquecida de libros y usuarios.

### Query params opcionales

| Parámetro | Descripción |
|-----------|-------------|
| user | ID de usuario para filtrar |
| mode | `count` o `check` para modos especiales |

### Modo count

```
GET /api/intercambios?mode=count&user=123
```

Devuelve el número de solicitudes activas para un usuario.

### Modo check

```
GET /api/intercambios?mode=check&user=123&libro=456
```

Verifica si el usuario ya tiene una solicitud activa para un libro.

### Respuesta estándar (sin mode)

```json
[
  {
    "id_intercambio": 1,
    "id_usuario_envia": 34,
    "id_usuario_recibe": 12,
    "id_libro_solicitado": 56,
    "id_libro_ofrecido": 78,
    "fecha_inicio": "2026-05-26T10:00:00",
    "fecha_cierre": null,
    "estado_usuario_envia": "solicitado",
    "estado_usuario_recibe": "solicitado",
    "libro_solicitado_titulo": "Cien años de soledad",
    "libro_solicitado_autor": "Gabriel García Márquez",
    "libro_solicitado_foto": "https://...",
    "libro_ofrecido_titulo": "1984",
    "libro_ofrecido_autor": "George Orwell",
    "libro_ofrecido_foto": "https://...",
    "propietario_nick_usuario": "lectura_fan",
    "solicitante_nick_usuario": "otro_lector"
  }
]
```

### Estados posibles

| Estado | Descripción |
|--------|-------------|
| `solicitado` | Solicitud creada, esperando respuesta |
| `seleccionado` | Libro ofrecido seleccionado |
| `aceptado` | Intercambio aceptado |
| `rechazado` | Intercambio rechazado |
| `valorar` | Pendiente de valoración |
| `finalizado` | Intercambio completado |
| `eliminado` | Intercambio eliminado |

### Filtros aplicados

- Excluye intercambios donde `estado_usuario_envia = 'eliminado'`
- Excluye intercambios donde `estado_usuario_recibe = 'eliminado'`
- Ordena por `fecha_inicio` DESC

### Respuestas

- 200: Array de intercambios
- 500: `{ "error": "Error BBDD" }`

---

## POST /api/intercambios

Crea una nueva solicitud de intercambio.

### Body

```json
{
  "id_usuario_envia": 34,
  "id_usuario_recibe": 12,
  "id_libro_solicitado": 56
}
```

### Comportamiento

1. Verifica que no exista una solicitud activa para el mismo libro y usuario
2. Inserta el intercambio con ambos estados = `solicitado`
3. Registra `fecha_inicio` en zona horaria de España (Europe/Madrid)
4. Envía email de notificación al propietario del libro

### Respuestas

- 201: `{ "id": 123, "message": "Intercambio creado" }`
- 400: `{ "error": "Faltan datos" }`
- 409: `{ "error": "Ya tienes una solicitud activa para este libro" }`
- 500: `{ "error": "Error BBDD" }`
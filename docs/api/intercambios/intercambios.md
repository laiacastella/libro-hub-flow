# API Intercambios

Documentacion de la ruta base y del arbol de endpoints bajo /api/intercambios.

## Estructura real en codigo

- /api/intercambios
- /api/intercambios/libro
- /api/intercambios/estado/individual
- /api/intercambios/estado/comun

## Mapa de endpoints

| Metodo | Ruta | Archivo route.js |
|---|---|---|
| GET | /api/intercambios | app/api/intercambios/route.js |
| POST | /api/intercambios | app/api/intercambios/route.js |
| PATCH | /api/intercambios/libro | app/api/intercambios/libro/route.js |
| PATCH | /api/intercambios/estado/individual | app/api/intercambios/estado/individual/route.js |
| PATCH | /api/intercambios/estado/comun | app/api/intercambios/estado/comun/route.js |

## GET /api/intercambios

Lista intercambios con joins a libros y usuarios.

### Query principal

- SELECT i.*
- i.fecha_inicio AS fecha
- JOIN a libros solicitado/ofrecido
- JOIN a propietario y solicitante
- Filtro:
  - estado_solicitud_propietario != eliminado
  - estado_solicitud_solicitante != eliminado
- ORDER BY i.fecha_inicio DESC

### Respuesta

- 200: array de intercambios enriquecidos
- 500: { "error": "Error BBDD" }

## POST /api/intercambios

Crea una solicitud de intercambio.

### Body

```json
{
  "id_usuario_recibe": 12,
  "id_usuario_envia": 34,
  "id_libro_solicitado": 56
}
```

### Comportamiento

- Inserta en intercambios
- Inicializa:
  - estado_solicitud_propietario = solicitado
  - estado_solicitud_solicitante = solicitado
  - fecha_inicio = NOW()

### Respuesta

- 201: { "id": number, "message": "Intercambio creado" }
- 500: { "error": "Error BBDD" }

## Endpoints documentados por separado

- Libro ofrecido: ver api/intercambios/libro.md
- Estado individual: ver api/intercambios/estado/individual.md
- Estado comun: ver api/intercambios/estado/comun.md

## Nota de migracion de estados

Ahora conviven dos nomenclaturas en el proyecto:

- En ruta base se usan estado_solicitud_propietario / estado_solicitud_solicitante
- En rutas nuevas de estado y libro se usan estado_usuario_envia / estado_usuario_recibe

Mientras termina la migracion, la documentacion refleja el comportamiento real de cada archivo route.js.

- El endpoint GET omite intercambios si alguno de los estados individuales es `eliminado`.
- `POST /api/intercambios` no fuerza `estado_solicitud` en la query de insercion; ese valor depende del flujo posterior y/o de defaults en BD.
- Existen logs de depuracion en algunos endpoints (`GET` de intercambios y `PATCH` de libro).

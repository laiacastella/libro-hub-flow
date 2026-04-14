# API Intercambios

Esta documentacion describe todos los endpoints activos bajo `/api/intercambios` y la logica de negocio aplicada en servidor.

## Resumen rapido

| Metodo | Ruta | Uso principal |
|---|---|---|
| GET | `/api/intercambios` | Listar intercambios con datos de libros y usuarios |
| POST | `/api/intercambios` | Crear una solicitud de intercambio |
| PATCH | `/api/intercambios/libro` | Asignar el libro ofrecido al intercambio |
| PATCH | `/api/intercambios/estado` | Cambiar estado individual (propietario o solicitante) |
| POST | `/api/intercambios/estado` | Actualizar ambos estados en una sola llamada (compatibilidad) |
| PATCH | `/api/intercambios/estado/comun` | Cambiar un estado comun para ambos usuarios |

## Modelo de datos (intercambios)

Los endpoints usan principalmente estos campos:

- `id_intercambio`
- `id_usuario_solicitante`
- `id_usuario_propietario`
- `id_libro_solicitado`
- `id_libro_ofrecido`
- `estado_solicitud`
- `estado_solicitud_solicitante`
- `estado_solicitud_propietario`
- `fecha_inicio`

Estados usados por el flujo actual:

- `solicitado`
- `seleccionado`
- `aceptado`
- `rechazado`
- `valorar`
- `finalizado`
- `eliminado`

## Reglas de negocio globales

1. Para pasar a `aceptado` debe existir `id_libro_ofrecido`.
2. En listados GET no se devuelven filas donde alguno de los estados individuales sea `eliminado`.
3. El estado general `estado_solicitud` se usa como resumen; los estados individuales guardan la decision por cada parte.
4. El endpoint de estado individual comprueba que el usuario que actua participa en el intercambio.

---

## 1) GET /api/intercambios

Lista intercambios con joins a libros y usuarios.

### SQL aplicado

- `SELECT i.*`
- Alias adicional de fecha: `i.fecha_inicio AS fecha`
- Join de libro solicitado (`s`) y libro ofrecido (`o`)
- Join de propietario (`p`) y solicitante (`u`)
- Filtro:
	- `estado_solicitud_propietario != 'eliminado'`
	- `estado_solicitud_solicitante != 'eliminado'`
- Orden: `ORDER BY i.fecha_inicio DESC`

### Campos extra devueltos (ademas de i.*)

- `fecha`
- `libro_solicitado_titulo`
- `libro_solicitado_autor`
- `libro_solicitado_foto`
- `libro_ofrecido_titulo`
- `libro_ofrecido_autor`
- `libro_ofrecido_foto`
- `propietario_nick_usuario`
- `propietario_nombre`
- `solicitante_nick_usuario`
- `solicitante_nombre`

### Respuesta exitosa

- `200 OK`
- Body: `Array<object>`

### Errores

- `500` con `{ "error": "Error BBDD" }`

### Nota

Actualmente el endpoint imprime en servidor:

- `console.log("GET /api/intercambios ->", rows)`

---

## 2) POST /api/intercambios

Crea una nueva solicitud de intercambio.

### Body requerido

```json
{
	"id_usuario_solicitante": 12,
	"id_usuario_propietario": 34,
	"id_libro_solicitado": 56
}
```

### Comportamiento

- Inserta fila en `intercambios` con:
	- `estado_solicitud_propietario = "solicitado"`
	- `estado_solicitud_solicitante = "solicitado"`
	- `fecha_inicio = NOW()`

### Respuesta exitosa

- `201 Created`

```json
{
	"id": 123,
	"message": "Intercambio creado"
}
```

### Errores

- `500` con `{ "error": "Error BBDD" }`

---

## 3) PATCH /api/intercambios/libro

Asigna el libro ofrecido en un intercambio.

### Body requerido

```json
{
	"id_intercambio": 123,
	"id_libro_ofrecido": 789
}
```

### Comportamiento

- Actualiza:
	- `id_libro_ofrecido = ?`
	- `estado_solicitud = "seleccionado"`

### Respuesta exitosa

- `200` con `{ "ok": true }`

### Errores

- `400` con `{ "error": "Faltan datos" }`
- `500` con `{ "error": "Error al actualizar libro ofrecido" }`

### Nota

Actualmente imprime en servidor:

- `console.log("PATCH /api/intercambios/libro", { id_intercambio, id_libro_ofrecido })`

---

## 4) PATCH /api/intercambios/estado

Actualiza el estado individual de quien realiza la accion.

### Body requerido

```json
{
	"id_intercambio": 123,
	"estado": "aceptado",
	"id_usuario_actual": 34
}
```

### Logica

1. Valida datos requeridos.
2. Si `estado = "aceptado"`, exige que exista `id_libro_ofrecido`.
3. Carga el intercambio y comprueba si `id_usuario_actual` es:
	 - propietario, o
	 - solicitante.
4. Si no participa: `403`.
5. Actualiza solo el estado individual del usuario actor.
6. Recalcula `estado_solicitud`:
	 - si ambos estados individuales quedan iguales, usa ese valor,
	 - si no, mantiene el estado general anterior.

### Respuesta exitosa

- `200`

```json
{
	"ok": true,
	"intercambio": {
		"id_intercambio": 123,
		"estado_solicitud": "aceptado",
		"estado_solicitud_propietario": "aceptado",
		"estado_solicitud_solicitante": "aceptado"
	}
}
```

### Errores

- `400` faltan datos
- `400` aceptar sin libro ofrecido
- `403` usuario no participante
- `404` intercambio no encontrado
- `500` error interno

---

## 5) POST /api/intercambios/estado

Endpoint de compatibilidad para actualizar ambos estados en una sola peticion.

### Body soportado

Opcion A (detallada):

```json
{
	"id_intercambio": 123,
	"estado_solicitud_solicitante": "aceptado",
	"estado_solicitud_propietario": "aceptado"
}
```

Opcion B (atajo):

```json
{
	"id_intercambio": 123,
	"estado": "aceptado"
}
```

### Logica

- Si solo llega `estado`, se aplica a ambos estados individuales.
- Si ambos estados individuales quedan iguales y no llega `estado`, el general puede actualizarse a ese valor.
- Si no son iguales y no llega `estado`, el general se conserva (`COALESCE`).

### Respuesta exitosa

- `200` con `{ "ok": true }`

### Errores

- `400` faltan datos
- `400` aceptar sin libro ofrecido
- `500` error interno

---

## 6) PATCH /api/intercambios/estado/comun

Actualiza el mismo estado para propietario y solicitante a la vez.

### Body requerido

```json
{
	"id_intercambio": 123,
	"estado": "rechazado"
}
```

### Logica

- Si `estado = "aceptado"`, exige libro ofrecido.
- Actualiza en una sola query:
	- `estado_solicitud_propietario = estado`
	- `estado_solicitud_solicitante = estado`
	- `estado_solicitud = estado`

### Respuesta exitosa

- `200`

```json
{
	"ok": true,
	"intercambio": {
		"id_intercambio": 123,
		"estado_solicitud": "rechazado",
		"estado_solicitud_propietario": "rechazado",
		"estado_solicitud_solicitante": "rechazado"
	}
}
```

### Errores

- `400` faltan datos
- `400` aceptar sin libro ofrecido
- `404` intercambio no encontrado
- `500` error interno

---

## Flujo recomendado de integracion

1. Crear intercambio con `POST /api/intercambios`.
2. Elegir libro ofrecido con `PATCH /api/intercambios/libro`.
3. Cambios por usuario (aceptar, valorar, eliminar, etc.) con `PATCH /api/intercambios/estado` enviando `id_usuario_actual`.
4. Cambios que deben ser iguales para ambos (por ejemplo cierre comun) con `PATCH /api/intercambios/estado/comun`.
5. Listar siempre con `GET /api/intercambios`.

## Observaciones tecnicas

- El endpoint GET omite intercambios si alguno de los estados individuales es `eliminado`.
- `POST /api/intercambios` no fuerza `estado_solicitud` en la query de insercion; ese valor depende del flujo posterior y/o de defaults en BD.
- Existen logs de depuracion en algunos endpoints (`GET` de intercambios y `PATCH` de libro).

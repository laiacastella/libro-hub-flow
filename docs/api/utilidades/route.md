# API Utilidades

Documentación de rutas auxiliares del sistema.

## Índice

- [Géneros](#géneros)
- [Provincias](#provincias)
- [Poblaciones](#poblaciones)
- [Validación email](#validación-email)
- [Validación nick](#validación-nick)

---

## Géneros

### GET /api/generos

Lista todos los géneros disponibles.

### Respuesta

```json
[
  { "id": 1, "nombre": "Novela" },
  { "id": 2, "nombre": "Ciencia Ficción" },
  { "id": 3, "nombre": "Misterio" }
]
```

---

## Provincias

### GET /api/provincias

Lista todas las provincias.

### Respuesta

```json
[
  { "id_provincia": 1, "provincia": "Madrid" },
  { "id_provincia": 2, "provincia": "Barcelona" }
]
```

---

## Poblaciones

### GET /api/poblaciones

Lista poblaciones de una provincia.

### Query params

- `id_provincia` - ID de provincia (obligatorio)

### Ejemplo

```
GET /api/poblaciones?id_provincia=1
```

### Respuesta

```json
[
  { "id_poblacion": 1, "poblacion": "Madrid" },
  { "id_poblacion": 2, "poblacion": "Alcalá de Henares" }
]
```

### Notas

- Si no se pasa `id_provincia`, devuelve array vacío

---

## Validación email

### GET /api/check-email

Verifica si un email está disponible para registro.

### Query params

- `email` - Email a verificar (obligatorio)

### Ejemplo

```
GET /api/check-email?email=usuario@ejemplo.com
```

### Respuesta

```json
{ "disponible": true }
```

- `disponible: true` → El email NO existe en la BD, se puede usar
- `disponible: false` → El email YA existe, no se puede registrar

---

## Validación nick

### GET /api/check-nick

Verifica si un nick de usuario está disponible.

### Query params

- `nick` - Nick a verificar (obligatorio)

### Ejemplo

```
GET /api/check-nick?nick=mi_nick
```

### Respuesta

```json
{ "disponible": true }
```

- `disponible: true` → El nick NO existe en la BD, se puede usar
- `disponible: false` → El nick YA existe, no se puede usar
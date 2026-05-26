# API Usuarios

Documentación de todas las rutas bajo `/api/usuarios`.

## Estructura real en código

- `/api/usuarios/registro` - Registro y listar usuarios
- `/api/usuarios/login` - Inicio de sesión
- `/api/usuarios/[id]` - Obtener perfil de usuario
- `/api/usuarios/foto` - Actualizar foto de perfil
- `/api/usuarios/actualizar` - Actualizar datos de usuario
- `/api/usuarios/forgot-password` - Solicitar reset de contraseña
- `/api/usuarios/reset-password` - Restablecer contraseña
- `/api/usuarios/validate-reset-token` - Validar token de reset
- `/api/usuarios/update-reset-token` - Actualizar token de reset

## Mapa de endpoints

| Método | Ruta | Archivo route.js |
|--------|------|------------------|
| GET | /api/usuarios/registro | app/api/usuarios/registro/route.js |
| POST | /api/usuarios/registro | app/api/usuarios/registro/route.js |
| POST | /api/usuarios/login | app/api/usuarios/login/route.js |
| GET | /api/usuarios/[id] | app/api/usuarios/[id]/route.js |
| POST | /api/usuarios/foto | app/api/usuarios/foto/route.js |
| POST | /api/usuarios/actualizar | app/api/usuarios/actualizar/route.js |

---

## POST /api/usuarios/login

Inicia sesión buscando por email o nick_usuario.

### Body

```json
{
  "identificador": "usuario@email.com o nick_usuario",
  "password": "contraseña"
}
```

### Respuesta exitosa

```json
{
  "success": true,
  "usuario": {
    "id_usuario": 1,
    "nick_usuario": "lectura_fan",
    "email": "usuario@email.com",
    "nombre": "Juan",
    "apellidos": "García",
    "telefono": "123456789",
    "codigo_postal": "28001",
    "foto_perfil": "https://...",
    "puntuacion_promedio": 4.5,
    "provincia": "Madrid",
    "poblacion": "Madrid"
  }
}
```

### Posibles respuestas

- 200: Login exitoso con datos de usuario
- 400: `{ "error": "Faltan credenciales" }`
- 401: `{ "error": "Usuario o contraseña incorrectos" }`
- 500: `{ "error": "Error al iniciar sesion" }`

---

## POST /api/usuarios/registro

Registra un nuevo usuario en la plataforma.

### Body

```json
{
  "nick_usuario": "mi_nick",
  "email": "mi@email.com",
  "password": "mi_contraseña",
  "nombre": "Juan",
  "apellidos": "García",
  "telefono": "123456789",
  "id_provincia": 1,
  "id_poblacion": 1
}
```

### Campos obligatorios

- nick_usuario
- email
- password
- nombre
- apellidos
- id_provincia
- id_poblacion

### Respuestas

- 200: `{ "success": true, "id_usuario": 123 }`
- 400: `{ "success": false, "error": "El nombre de usuario ya está en uso" }`
- 400: `{ "success": false, "error": "El correo electrónico ya está registrado" }`
- 500: `{ "success": false, "error": "Error en el servidor" }`

---

## GET /api/usuarios/[id]

Obtiene el perfil completo de un usuario.

### Parámetros

- `id` - ID del usuario (path parameter)

### Respuesta

```json
{
  "id_usuario": 1,
  "nick_usuario": "lectura_fan",
  "email": "usuario@email.com",
  "nombre": "Juan",
  "apellidos": "García",
  "foto_perfil": "https://...",
  "telefono": "123456789",
  "codigo_postal": "28001",
  "puntuacion_promedio": 4.5,
  "provincia": "Madrid",
  "poblacion": "Madrid"
}
```

### Posibles respuestas

- 200: Datos del usuario
- 404: `{ "error": "Usuario no encontrado" }`
- 500: `{ "error": "Error de servidor" }`

---

## POST /api/usuarios/foto

Actualiza la foto de perfil de un usuario.

### Body

```json
{
  "id_usuario": 123,
  "foto_perfil": "https://nueva-foto.jpg"
}
```

### Respuestas

- 200: `{ "success": true, "id_usuario": 123 }`
- 400: `{ "error": "Falta id_usuario o foto_perfil" }`
- 500: `{ "error": "..." }`

---

## POST /api/usuarios/actualizar

Actualiza campos de un usuario (excepto password, que es opcional).

### Body

```json
{
  "id_usuario": 123,
  "nick_usuario": "nuevo_nick",
  "email": "nuevo@email.com",
  "nombre": "Juan",
  "apellidos": "García",
  "telefono": "123456789",
  "password": "nueva_password",
  "repPassword": "nueva_password"
}
```

### Notas

- `password` es opcional; si se incluye, se hashea
- `repPassword` se ignora (es solo para el formulario)
- Validación de nick y email únicos (excluye al propio usuario)

### Respuestas

- 200: `{ "success": true }`
- 400: `{ "success": false, "error": "Falta id_usuario" }`
- 400: `{ "success": false, "error": "El nombre de usuario ya está en uso" }`
- 400: `{ "success": false, "error": "El correo electrónico ya está registrado" }`
- 500: `{ "success": false, "error": "Error en el servidor" }`
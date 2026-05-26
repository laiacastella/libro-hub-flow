# POST /api/usuarios/login

Inicia sesión buscando por email o nick_usuario.

## Body

```json
{
  "identificador": "usuario@email.com o nick_usuario",
  "password": "contraseña"
}
```

## Respuesta exitosa

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

## Estados de respuesta

- 200: Login exitoso con datos de usuario
- 400: `{ "error": "Faltan credenciales" }`
- 401: `{ "error": "Usuario o contraseña incorrectos" }`
- 500: `{ "error": "Error al iniciar sesion" }`
# GET /api/intercambios/confirmar-email

Confirmación de entrega desde email (link en email de aceptación).

## Archivo fuente

- `app/api/intercambios/confirmar-email/route.js`

## Query params

| Parámetro | Descripción |
|-----------|-------------|
| id_intercambio | ID del intercambio |
| id_usuario | ID del usuario que confirma |

## Comportamiento

1. Valida que el intercambio exista
2. Valida que el usuario sea participante
3. Verifica que el estado actual sea `aceptado`
4. Actualiza estado del usuario a `valorar`
5. Archiva el libro correspondiente
6. Redirige a la página de solicitudes después de 3 segundos

## Página HTML mostrada

- Si éxito: "✅ ¡Confirmación exitosa!" y redirige
- Si error: Muestra mensaje de error apropiado

## Estados de respuesta HTML

- 200: Confirmación exitosa (página con redirect)
- 400: Enlace inválido / Acción no disponible
- 403: Acceso denegado
- 404: Intercambio no encontrado
- 500: Error interno
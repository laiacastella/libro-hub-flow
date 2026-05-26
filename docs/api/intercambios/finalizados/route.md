# GET /api/intercambios/finalizados

Cuenta los intercambios finalizados de un usuario.

## Archivo fuente

- `app/api/intercambios/finalizados/route.js`

## Query params

| Parámetro | Descripción |
|-----------|-------------|
| user | ID del usuario (obligatorio) |

## Ejemplo

```
GET /api/intercambios/finalizados?user=123
```

## Respuesta

```json
{
  "total": 5
}
```

## Estados de respuesta

- 200: `{ "total": number }`
- 400: `{ "error": "Falta id_usuario" }`
- 500: `{ "error": "Error al obtener intercambios finalizados" }`

## Nota

Un intercambio se considera finalizado si:
- `estado_usuario_envia = 'finalizado'` O
- `estado_usuario_recibe = 'finalizado'`
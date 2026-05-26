# Subir Imagen

Sube una imagen al servicio Freeimage.host y devuelve la URL.

## Endpoint

```
POST /api/upload
```

## Headers

| Nombre | Valor |
|--------|-------|
| Content-Type | `multipart/form-data` |

## Body (FormData)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| archivo | File | Imagen a subir (jpeg, png, webp) |

## Límites

- **Tamaño máximo:** 2MB
- **Tipos permitidos:** image/jpeg, image/png, image/webp

## Ejemplo

```javascript
const form = new FormData();
form.append("archivo", archivoInput.files[0]);

const res = await fetch("/api/upload", {
    method: "POST",
    body: form,
});

const data = await res.json();
console.log(data.image.url); // URL de la imagen
```

## Respuestas

| Status | Descripción |
|--------|-------------|
| 200 | Imagen subida correctamente. Devuelve `{ image: { url, ... } }` |
| 400 | Sin archivo, tipo inválido o tamaño excedido |
| 500 | Error interno del servidor |

## Ejemplo de respuesta exitosa

```json
{
    "status": "success",
    "image": {
        "url": "https://freeimage.host/i/abc123",
        "short_url": "...",
        "filename": "imagen.jpg",
        "size": 102400,
        "mime": "image/jpeg"
    }
}
```

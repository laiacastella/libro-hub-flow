# Carpeta public/

La carpeta `public/` contiene assets estáticos servidos directamente por Next.js.

## Estructura

```
public/
├── favicon.ico             # Icono del sitio
├── imagenes/               # Imágenes del proyecto
│   ├── logo/
│   ├── iconos/
│   └── fondos/
└── fonts/                  # Fuentes personalizadas
```

## Convenciones

- Archivos en `public/` son accesibles desde la raíz
- Ejemplo: `public/imagenes/logo.png` → accesible en `/imagenes/logo.png`
- Usar para imágenes, fuentes, favicons, manifest.json
- No incluir archivos sensibles

## Imágenes principales

| Imagen | Uso |
|--------|-----|
| `logo.png` | Logo principal de la aplicación |
| `favicon.ico` | Icono del navegador |

## Nota sobre subidas

Las imágenes subidas por usuarios no se guardan en `public/`. Se suben a:
- **Freeimage.host** - Servicio externo de alojamiento de imágenes
- URL guardada en base de datos

Esto evita:
- Llenar el repositorio con imágenes
- Problemas de almacenamiento en servidor
- Límites de tamaño en despliegue

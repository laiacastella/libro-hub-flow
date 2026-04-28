# Libro Hub Flow

Proyecto web construido con Next.js y una documentación adicional en MkDocs.

## Descripción

`libro-hub-flow` es una aplicación de biblioteca/intercambio de libros que combina:

- Frontend con `Next.js` y `React`
- Estilos con Bootstrap y CSS modules
- Autenticación y lógica de usuario
- APIs internas gestionadas desde `app/api`
- Documentación técnica en `docs/` usando MkDocs Material

## Tecnologías principales

- `next` 16.x
- `react` 19.x
- `bootstrap` 5
- `tailwindcss` 4
- `mysql2`
- `bcryptjs`
- `nodemailer`
- `firebase`
- `mkdocs` + `mkdocs-material`

## Scripts disponibles

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

- `npm run dev`: ejecuta el servidor de desarrollo de Next.js.
- `npm run build`: genera la aplicación para producción.
- `npm run start`: inicia la aplicación ya compilada.
- `npm run lint`: ejecuta ESLint sobre el código.

## Desarrollo local

1. Instala dependencias:

```bash
npm install
```

2. Arranca el servidor de desarrollo:

```bash
npm run dev
```

3. Abre el navegador en:

```text
http://localhost:3000
```

4. Edita archivos en `app/` y `components/`.

## Documentación con MkDocs

La documentación del proyecto se encuentra en la carpeta `docs/` y se configura con `mkdocs.yml`.

### Ejecutar el sitio de docs localmente

Si no tienes MkDocs instalado, instálalo con Python:

```bash
python -m pip install mkdocs mkdocs-material
```

Luego ejecuta:

```bash
python -m mkdocs serve
```

El sitio quedará disponible en:

```text
http://127.0.0.1:8000
```

### Construir la documentación estática

```bash
mkdocs build
```

## Estructura relevante

- `app/`: rutas y páginas de la aplicación Next.js.
- `components/`: componentes reutilizables.
- `docs/`: contenido de la documentación MkDocs.
- `lib/`: utilidades del backend, como base de datos y correo.
- `public/`: activos estáticos.

## Navegación de la documentación

El menú de `mkdocs.yml` incluye:

- `Inicio`
- `API > Intercambios`
- La documentación del flujo de trabajo y ramas

## Notas adicionales

- Esta rama actual es `develop`.
- Para ramas de trabajo se recomienda usar la convención `tipo/donde/breve-nombre-descriptivo`.
- No hacer push directo a `main`.


# Estructura del Proyecto

Libro Hub Flow sigue una estructura estándar de Next.js con App Router.

```
libro-hub-flow/
├── app/                    # Rutas y páginas (App Router)
│   ├── (autentificacion)/  # Grupo de rutas sin header
│   ├── (con-Header)/       # Grupo de rutas con header
│   ├── api/                # API Routes
│   └── Pruebas/            # Páginas de prueba
├── components/             # Componentes React reutilizables
│   ├── Cards/
│   ├── Carrusel/
│   ├── Comentarios/
│   ├── Formularios/
│   ├── Intercambios/
│   ├── Layout/
│   ├── PopUps/
│   ├── SessionTimeout/
│   ├── Solicitudes/
│   ├── UI/
│   └── Valoraciones/
├── data/                   # Datos estáticos JSON
├── docs/                   # Documentación MkDocs
├── hooks/                  # Custom React Hooks
├── lib/                    # Utilidades del servidor
├── public/                 # Assets estáticos
└── [archivos config]       # Configuración del proyecto
```

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 16.x | Framework React con App Router |
| React | 19.x | Biblioteca UI |
| Bootstrap | 5.x | Framework CSS |
| MySQL | 8.x | Base de datos |

## Navegación por Carpetas

- **[app/](app.md)** - Rutas y páginas de la aplicación
- **[components/](components.md)** - Componentes reutilizables
- **[data/](data.md)** - Datos estáticos
- **[hooks/](hooks.md)** - Custom React Hooks
- **[lib/](lib.md)** - Utilidades del servidor
- **[public/](public.md)** - Assets estáticos

## Rutas de la Aplicación

### Rutas de Autenticación `(autentificacion)/`

| Ruta | Descripción |
|------|-------------|
| `/inicioSesion` | Formulario de login |
| `/registro` | Formulario de registro |
| `/resetPassword` | Restablecer contraseña |

### Rutas con Header `(con-Header)/`

| Ruta | Descripción |
|------|-------------|
| `/biblioteca` | Lista de libros con búsqueda |
| `/biblioteca/[id]` | Ficha detalle de un libro |
| `/perfilUsuario` | Perfil del usuario logueado |
| `/editarCuenta` | Editar datos de la cuenta |
| `/subirLibro` | Subir nuevo libro |

## API Routes

Ver documentación completa en [API Reference](api/index.md)

## Componentes

### Cards

| Componente | Descripción |
|------------|-------------|
| `CardLibro` | Tarjeta de libro en lista |
| `CardComentario` | Tarjeta de comentario |
| `CardValoracion` | Tarjeta de valoración |
| `CardSolicitud` | Tarjeta de solicitud de intercambio |
| `CardReseña` | Tarjeta de reseña |
| `CardIntercambioCompletado` | Tarjeta de intercambio finalizado |
| `CardIcono` | Tarjeta con icono |

### UI

| Componente | Descripción |
|------------|-------------|
| `Boton` | Botón personalizado |
| `Input` | Input personalizado |
| `Select` | Select personalizado |
| `AreaTexto` | Textarea personalizado |
| `PopUp` | Modal/popup genérico |
| `Paginacion` | Controles de paginación |
| `Estrellas` | Sistema de puntuación |
| `Contador` | Contador animado |
| `Enlaces` | Lista de enlaces |
| `Portada` | Componente de portadalibro |

### Otros

| Componente | Descripción |
|------------|-------------|
| `Carrusel` | Carrusel de libros |
| `Comentarios` | Gestión de comentarios |
| `Intercambios` | Lista de intercambios |
| `Solicitudes` | Gestión de solicitudes |
| `Valoraciones` | Sistema de valoraciones |
| `SessionTimeout` | Control de sesión |

## Utilities Backend (lib/)

| Archivo | Descripción |
|---------|-------------|
| `db.js` | Conexión a MySQL |
| `mailer.js` | Configuración de Nodemailer |
| `paginate.js` | Utilidad de paginación |
| `plantillas-mail-intercambio.js` | Plantillas de email |

## Base de Datos

MySQL con tablas para:
- `usuarios` - Usuarios registrados
- `libros` - Libros disponibles
- `intercambios` - Solicitudes de intercambio
- `comentarios` - Comentarios en libros
- `valoraciones` - Valoraciones de usuarios
- `generos` - Géneros literarios
- `provincias` - Provincias de España
- `poblaciones` - Populations por provincia

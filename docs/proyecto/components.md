# Carpeta components/

La carpeta `components/` contiene todos los componentes React reutilizables organizados por categoría.

## Estructura

```
components/
├── Cards/                  # Tarjetas de información
├── Carrusel/               # Carrusel de elementos
├── Comentarios/            # Gestión de comentarios
├── ComponenteBiblioteca/   # Componentes específicos de biblioteca
├── Formularios/            # Formularios reutilizables
├── Intercambios/           # Componentes de intercambios
├── Layout/                 # Componentes de layout
├── PopUps/                 # Modales y popups
├── SessionTimeout/         # Control de sesión
├── Solicitudes/            # Gestión de solicitudes
├── UI/                     # Componentes UI básicos
└── Valoraciones/           # Componentes de valoraciones
```

## Cards/

Componentes de tarjeta para mostrar información estructurada.

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `CardLibro` | `CardLibro/CardLibro.jsx` | Tarjeta de libro en lista |
| `CardComentario` | `CardComentario/CardComentario.jsx` | Tarjeta de comentario |
| `CardValoracion` | `CardValoracion/CardValoracion.jsx` | Tarjeta de valoración |
| `CardSolicitud` | `CardSolicitud/CardSolicitud.jsx` | Tarjeta de solicitud de intercambio |
| `CardReseña` | `CardReseña/CardReseña.jsx` | Tarjeta de reseña |
| `CardIntercambioCompletado` | `CardIntercambioCompletado/CardIntercambioCompletado.jsx` | Intercambio finalizado |
| `CardIcono` | `CardIcono/CardIcono.jsx` | Tarjeta con icono |

## UI/

Componentes básicos de interfaz de usuario.

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `Boton` | `Boton/Boton.jsx` | Botón personalizado |
| `Input` | `Input/Input.jsx` | Input de texto |
| `Select` | `Select/Select.jsx` | Select desplegable |
| `AreaTexto` | `AreaTexto/AreaTexto.jsx` | Textarea |
| `PopUp` | `PopUp/PopUp.jsx` | Modal genérico |
| `Paginacion` | `Paginacion/Paginacion.jsx` | Controles de paginación |
| `Estrellas` | `Estrellas/Estrellas.jsx` | Sistema de puntuación |
| `Contador` | `Contador/Contador.jsx` | Contador animado |
| `Portada` | `Portada/Portada.jsx` | Portada de libro |
| `ItemsPorPagina` | `ItemsPorPagina/ItemsPorPagina.jsx` | Selector de items |
| `Enlaces` | `Enlaces/Enlaces.jsx` | Lista de enlaces |

## Otros Componentes

| Carpeta | Componentes | Descripción |
|---------|-------------|-------------|
| `Carrusel/` | `Carrusel.jsx` | Carrusel de libros destacados |
| `Comentarios/` | `Comentarios.jsx`, `FormularioComentario.jsx` | Sistema de comentarios |
| `Formularios/` | `FormularioRegistro.jsx`, `FormularioLogin.jsx` | Formularios de auth |
| `Intercambios/` | `ListaIntercambios.jsx`, `DetalleIntercambio.jsx` | Gestión de intercambios |
| `Layout/` | `Header.jsx`, `Footer.jsx` | Layout general |
| `PopUps/` | `PopUpConfirmacion.jsx`, `PopUpLibro.jsx` | Modales específicos |
| `SessionTimeout/` | `SessionTimeout.jsx` | Control de inactividad |
| `Solicitudes/` | `SolicitudesPendientes.jsx` | Lista de solicitudes |
| `Valoraciones/` | `FormularioValoracion.jsx`, `ListaValoraciones.jsx` | Sistema de valoraciones |

## Convenciones

- Cada componente en su propia carpeta
- Nombre de carpeta en PascalCase
- Archivo principal con el mismo nombre que la carpeta
- CSS modules opcional: `Componente.module.css`
- Export default del componente

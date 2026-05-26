# Carpeta app/

La carpeta `app/` contiene todas las rutas de la aplicación usando el App Router de Next.js.

## Estructura

```
app/
├── (autentificacion)/      # Grupo: rutas sin header
│   ├── inicioSesion/
│   ├── registro/
│   └── resetPassword/
├── (con-Header)/           # Grupo: rutas con header
│   ├── biblioteca/
│   ├── editarCuenta/
│   ├── perfilUsuario/
│   └── subirLibro/
├── api/                    # API Routes
│   ├── check-email/
│   ├── check-nick/
│   ├── comentarios/
│   ├── generos/
│   ├── incidencia/
│   ├── intercambios/
│   ├── libros/
│   ├── poblaciones/
│   ├── provincias/
│   ├── subir-libro/
│   ├── upload/
│   ├── usuarios/
│   └── valoraciones/
└── Pruebas/                # Páginas de prueba
```

## Grupos de Rutas

Los grupos `(autentificacion)` y `(con-Header)` permiten aplicar layouts diferentes sin afectar la URL.

### (autentificacion)/

Rutas sin el header principal. Usadas para login y registro.

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/inicioSesion` | `inicioSesion/page.jsx` | Formulario de login |
| `/registro` | `registro/page.jsx` | Formulario de registro |
| `/resetPassword` | `resetPassword/page.jsx` | Restablecer contraseña |

### (con-Header)/

Rutas con el header principal. Accesibles solo para usuarios logueados.

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/biblioteca` | `biblioteca/page.jsx` | Lista de libros |
| `/biblioteca/[id]` | `biblioteca/[id]/page.jsx` | Ficha de libro |
| `/perfilUsuario` | `perfilUsuario/page.jsx` | Perfil del usuario |
| `/editarCuenta` | `editarCuenta/page.jsx` | Editar datos |
| `/subirLibro` | `subirLibro/page.jsx` | Subir nuevo libro |

## Convenciones de Archivos

| Archivo | Propósito |
|---------|-----------|
| `page.jsx` | Componente principal de la ruta |
| `layout.jsx` | Layout compartido del grupo |
| `*.module.css` | Estilos CSS modules |
| `loading.jsx` | UI de carga |
| `error.jsx` | UI de error |
| `route.js` | API endpoint (en `/api`) |

## Archivos de Página

Cada `page.jsx` exporta un componente React que renderiza el contenido de la ruta.

Ejemplo:
```jsx
// app/(con-Header)/biblioteca/page.jsx
export default function BibliotecaPage() {
    return (
        <div>
            <h1>Biblioteca</h1>
            {/* contenido */}
        </div>
    );
}
```

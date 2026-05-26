# Carpeta hooks/

La carpeta `hooks/` contiene custom React Hooks para lógica reutilizable en componentes.

## Archivos

| Hook | Archivo | Descripción |
|------|---------|-------------|
| `useAuthRedirect` | `useAuthRedirect.js` | Redirección basada en autenticación |
| `useEsMovil` | `useEsMovil.js` | Detecta si es dispositivo móvil |
| `useInactividad` | `useInactividad.js` | Control de inactividad de sesión |
| `useIntercambio` | `useIntercambio.js` | Gestión de estado de intercambios |
| `useLibroActivo` | `useLibroActivo.js` | Control de libro seleccionado |
| `useTiempo` | `useTiempo.js` | Formateo de fechas y tiempos |
| `useUsuario` | `useUsuario.js` | Datos y acciones del usuario |
| `useUsuarioIntercambio` | `useUsuarioIntercambio.js` | Intercambios del usuario actual |
| `comprobarPassword` | `comprobarPassword.js` | Validación de contraseñas |

## useAuthRedirect

```javascript
import useAuthRedirect from '@/hooks/useAuthRedirect';

function MiComponente() {
    useAuthRedirect('/login', '/biblioteca');
    // Redirige a /login si no está autenticado
    // Redirige a /biblioteca si está autenticado
}
```

## useEsMovil

```javascript
import useEsMovil from '@/hooks/useEsMovil';

function MiComponente() {
    const esMovil = useEsMovil();
    // Retorna true si el ancho de pantalla < 768px
}
```

## useInactividad

```javascript
import useInactividad from '@/hooks/useInactividad';

function MiComponente() {
    const { tiempoInactivo, resetearTiempo } = useInactividad(300000); // 5 minutos
    // Detecta inactividad del usuario
}
```

## useUsuario

```javascript
import useUsuario from '@/hooks/useUsuario';

function MiComponente() {
    const { usuario, cargando, error } = useUsuario();
    // Obtiene datos del usuario logueado
}
```

## Convenciones

- Nombre del hook en camelCase con prefijo `use`
- Archivo con el mismo nombre que el hook
- Export default del hook
- Documentar parámetros y retorno

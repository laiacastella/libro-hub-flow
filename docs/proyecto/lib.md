# Carpeta lib/

La carpeta `lib/` contiene utilidades y configuraciones del lado del servidor.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `db.js` | Conexión a base de datos MySQL |
| `mailer.js` | Configuración de envío de emails |
| `paginate.js` | Utilidad de paginación |
| `plantillas-mail-intercambio.js` | Plantillas HTML para emails |

## db.js

Conexión a MySQL usando mysql2.

```javascript
import { db } from '@/lib/db';

const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
```

### Configuración

Variables de entorno:
- `MYSQL_HOST` - Host de la base de datos
- `MYSQL_PORT` - Puerto (default 3306)
- `MYSQL_USER` - Usuario
- `MYSQL_PASSWORD` - Contraseña
- `MYSQL_DATABASE` - Nombre de la base de datos

## mailer.js

Configuración de Nodemailer para envío de emails.

```javascript
import { transporter } from '@/lib/mailer';

await transporter.sendMail({
    from: '"LibroHubFlow" <noreply@librohubflow.com>',
    to: 'usuario@ejemplo.com',
    subject: 'Asunto',
    html: '<p>Contenido HTML</p>'
});
```

### Configuración

Variables de entorno:
- `EMAIL_USER` - Cuenta de Gmail
- `EMAIL_PASS` - Contraseña de aplicación

## paginate.js

Utilidad para calcular paginación.

```javascript
import { getPagina } from '@/lib/paginate';

const { startIndex, endIndex, totalPages } = getPagina(1, 12, 100);
// startIndex: 0, endIndex: 12, totalPages: 9
```

### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| page | number | Página actual |
| perPage | number | Items por página |
| totalItems | number | Total de items |

## plantillas-mail-intercambio.js

Plantillas HTML para emails de intercambios.

```javascript
import { getSolicitudTemplate } from '@/lib/plantillas-mail-intercambio';

const html = getSolicitudTemplate('usuario123', 'Cien años de soledad');
```

### Funciones disponibles

| Función | Descripción |
|---------|-------------|
| `getSolicitudTemplate(nick, titulo)` | Nueva solicitud recibida |
| `getAceptadoTemplate(nick, titulo)` | Intercambio aceptado |
| `getRechazadoTemplate(nick)` | Intercambio rechazado |
| `getFinalizadoTemplate(nick, titulo)` | Intercambio completado |

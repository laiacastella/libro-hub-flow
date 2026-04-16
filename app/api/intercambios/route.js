import { db } from "@/lib/db";

export async function GET() {
    try {
        // Consulta para obtener los intercambios, incluyendo información de los libros y usuarios relacionados
        const [rows] = await db.query(`
            SELECT
                i.*,
                i.fecha_inicio AS fecha,
                COALESCE(NULLIF(i.estado_usuario_envia, ''), 'solicitado') AS estado_usuario_envia,
                COALESCE(NULLIF(i.estado_usuario_recibe, ''), 'solicitado') AS estado_usuario_recibe,

                s.titulo AS libro_solicitado_titulo,
                s.autor AS libro_solicitado_autor,
                s.foto_portada AS libro_solicitado_foto,

                o.titulo AS libro_ofrecido_titulo,
                o.autor AS libro_ofrecido_autor,
                o.foto_portada AS libro_ofrecido_foto,

                p.nick_usuario AS propietario_nick_usuario,
                p.nombre AS propietario_nombre,

                u.nick_usuario AS solicitante_nick_usuario,
                u.nombre AS solicitante_nombre
            FROM intercambios i
            LEFT JOIN libros s ON i.id_libro_solicitado = s.id_libro
            LEFT JOIN libros o ON i.id_libro_ofrecido = o.id_libro
            LEFT JOIN usuarios p ON i.id_usuario_recibe = p.id_usuario
            LEFT JOIN usuarios u ON i.id_usuario_envia = u.id_usuario
                        WHERE (i.estado_usuario_recibe IS NULL OR i.estado_usuario_recibe != 'eliminado')
                            AND (i.estado_usuario_envia IS NULL OR i.estado_usuario_envia != 'eliminado')
            ORDER BY i.fecha_inicio DESC
        `);

            console.log("GET /api/intercambios ->", rows); // Log para verificar los datos obtenidos de la base de datos

        return Response.json(rows);
    } catch (error) {
        console.error("DB ERROR:", error?.message);
console.error(error);
        return Response.json({ error: "Error BBDD" }, { status: 500 });
    }
}


// Creación de la solicitud
export async function POST(req) {
    try {
        // recibe el id del usuario solicitante, el id del usuario propietario y el id del libro solicitado
        const {
            id_usuario_envia,
            id_usuario_recibe,
            id_libro_solicitado,
        } = await req.json();

        const usuarioEnvia = id_usuario_envia;
        const usuarioRecibe = id_usuario_recibe;

        if (!usuarioEnvia || !usuarioRecibe || !id_libro_solicitado) {
            return Response.json({ error: "Faltan datos" }, { status: 400 });
        }

        const [result] = await db.query(
  `
  INSERT INTO intercambios (
    id_usuario_envia,
    id_usuario_recibe,
    id_libro_solicitado,
    estado_usuario_recibe,
    estado_usuario_envia,
    fecha_inicio
  )
  VALUES (?, ?, ?, ?, ?, NOW())
  `,
  [
        usuarioEnvia,
        usuarioRecibe,
    id_libro_solicitado,
    "solicitado",
    "solicitado"
  ]
);

        return Response.json({ id: result.insertId, message: "Intercambio creado" }, { status: 201 });
    } catch (error) {
        console.error("DB ERROR:", error?.message);
        console.error(error);
        return Response.json({ error: "Error BBDD" }, { status: 500 });
    }
}

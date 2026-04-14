import { db } from "@/lib/db";

export async function GET() {
    try {
        // Consulta para obtener los intercambios, incluyendo información de los libros y usuarios relacionados
        const [rows] = await db.query(`
            SELECT
                i.*,
                i.fecha_inicio AS fecha,

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
            LEFT JOIN usuarios p ON i.id_usuario_propietario = p.id_usuario
            LEFT JOIN usuarios u ON i.id_usuario_solicitante = u.id_usuario
            WHERE i.estado_solicitud_propietario != 'eliminado'
              AND i.estado_solicitud_solicitante != 'eliminado'
            ORDER BY i.fecha_inicio DESC
        `);

            console.log("GET /api/intercambios ->", rows); // Log para verificar los datos obtenidos de la base de datos

        return Response.json(rows);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Error BBDD" }, { status: 500 });
    }
}


// Creación de la solicitud
export async function POST(req) {
    try {
        // recibe el id del usuario solicitante, el id del usuario propietario y el id del libro solicitado
        const { id_usuario_solicitante, id_usuario_propietario, id_libro_solicitado } = await req.json();

        const [result] = await db.query(
            `
            INSERT INTO intercambios (id_usuario_solicitante, id_usuario_propietario, id_libro_solicitado, estado_solicitud_propietario, estado_solicitud_solicitante, fecha_inicio)
            VALUES (?, ?, ?, ?, ?, NOW())
    `,
            [id_usuario_solicitante, id_usuario_propietario, id_libro_solicitado, "solicitado", "solicitado"],
        );

        return Response.json({ id: result.insertId, message: "Intercambio creado" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Error BBDD" }, { status: 500 });
    }
}

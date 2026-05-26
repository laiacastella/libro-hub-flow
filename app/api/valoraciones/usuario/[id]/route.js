import { db } from "@/lib/db";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const userId = Number(id);

        if (!Number.isInteger(userId) || userId <= 0) {
            return Response.json({ error: "ID de usuario no valido" }, { status: 400 });
        }

        const [rows] = await db.query(
            `SELECT
                v.id_valoracion,
                v.id_usuario_evaluador,
                v.puntuacion,
                v.valoracion,
                DATE_FORMAT(v.fecha_valoracion, '%Y-%m-%d %H:%i:%s') AS fecha_valoracion,
                u.nick_usuario,
                u.foto_perfil
            FROM valoraciones v
            JOIN usuarios u ON v.id_usuario_evaluador = u.id_usuario
            WHERE v.id_usuario_evaluado = ?
            ORDER BY v.fecha_valoracion DESC`,
            [userId]
        );

        return Response.json(rows);
    } catch (error) {
        console.error("Error GET /api/valoraciones/usuario:", error);
        return Response.json({ error: "Error al obtener las valoraciones" }, { status: 500 });
    }
}
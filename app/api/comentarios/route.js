import { db } from "@/lib/db";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const idLibro = Number(searchParams.get("id_libro"));

        let query = "SELECT id_comentario, id_usuario, id_libro, comentario, DATE_FORMAT(fecha_comentario, '%Y-%m-%d %H:%i:%s') AS fecha_comentario FROM comentarios";
        const params = [];

        if (!Number.isNaN(idLibro) && idLibro > 0) {
            query += " WHERE id_libro = ?";
            params.push(idLibro);
        }

        query += " ORDER BY fecha_comentario DESC";

        const [rows] = await db.query(query, params);
        return Response.json({ data: rows }, { status: 200 });
    } catch (error) {
        console.error("Error GET /api/comentarios:", error);
        return Response.json({ error: "Error al obtener comentarios" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { id_libro, id_usuario, comentario, fecha_comentario } = await req.json();

        const idLibroNum = Number(id_libro);
        const idUsuarioNum = Number(id_usuario);
        const comentarioLimpio = String(comentario || "").trim();

        if (!comentarioLimpio) {
            return Response.json({ error: "El comentario es obligatorio" }, { status: 400 });
        }

        if (Number.isNaN(idLibroNum) || idLibroNum <= 0 || Number.isNaN(idUsuarioNum) || idUsuarioNum <= 0) {
            return Response.json({ error: "Faltan id_libro o id_usuario válidos" }, { status: 400 });
        }

        const fechaComentarioTexto = typeof fecha_comentario === "string" ? fecha_comentario.trim() : "";
        const fechaValida = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(fechaComentarioTexto);

        const queryInsert = fechaValida ? "INSERT INTO comentarios (id_libro, id_usuario, comentario, fecha_comentario) VALUES (?, ?, ?, ?)" : "INSERT INTO comentarios (id_libro, id_usuario, comentario, fecha_comentario) VALUES (?, ?, ?, NOW())";
        const paramsInsert = fechaValida ? [idLibroNum, idUsuarioNum, comentarioLimpio, fechaComentarioTexto] : [idLibroNum, idUsuarioNum, comentarioLimpio];

        const [resultado] = await db.query(queryInsert, paramsInsert);

        const [rows] = await db.query("SELECT id_comentario, id_usuario, id_libro, comentario, DATE_FORMAT(fecha_comentario, '%Y-%m-%d %H:%i:%s') AS fecha_comentario FROM comentarios WHERE id_comentario = ? LIMIT 1", [resultado.insertId]);

        return Response.json({ success: true, comentario: rows[0] || null }, { status: 201 });
    } catch (error) {
        console.error("Error POST /api/comentarios:", error);
        return Response.json({ error: "Error al crear comentario" }, { status: 500 });
    }
}

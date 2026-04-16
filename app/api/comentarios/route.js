import { db } from "@/lib/db";

async function obtenerComentarioPorId(idComentario) {
    const [rows] = await db.query(
        `SELECT 
                c.id_comentario, 
                c.id_usuario, 
                c.id_libro, 
                c.comentario, 
                DATE_FORMAT(c.fecha_comentario, '%Y-%m-%d %H:%i:%s') AS fecha_comentario, 
                u.nick_usuario, 
                u.foto_perfil 
            FROM comentarios c 
            JOIN usuarios u ON c.id_usuario = u.id_usuario
            WHERE c.id_comentario = ?
            LIMIT 1`,
        [idComentario],
    );

    return rows[0] || null;
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const idLibro = Number(searchParams.get("id_libro"));

        let query = `SELECT 
                c.id_comentario, 
                c.id_usuario, 
                c.id_libro, 
                c.comentario, 
                DATE_FORMAT(c.fecha_comentario, '%Y-%m-%d %H:%i:%s') AS fecha_comentario, 
                u.nick_usuario, 
                u.foto_perfil 
            FROM comentarios c 
            JOIN usuarios u ON c.id_usuario = u.id_usuario
            WHERE id_libro = ?
            ORDER BY fecha_comentario DESC`;

        const params = [idLibro];

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

export async function PUT(req) {
    try {
        const { id_comentario, id_usuario, comentario } = await req.json();

        const idComentarioNum = Number(id_comentario);
        const idUsuarioNum = Number(id_usuario);
        const comentarioLimpio = String(comentario || "").trim();

        if (Number.isNaN(idComentarioNum) || idComentarioNum <= 0 || Number.isNaN(idUsuarioNum) || idUsuarioNum <= 0) {
            return Response.json({ error: "Faltan id_comentario o id_usuario válidos" }, { status: 400 });
        }

        if (!comentarioLimpio) {
            return Response.json({ error: "El comentario es obligatorio" }, { status: 400 });
        }

        const [comentariosExistentes] = await db.query("SELECT id_comentario FROM comentarios WHERE id_comentario = ? AND id_usuario = ? LIMIT 1", [idComentarioNum, idUsuarioNum]);

        if (comentariosExistentes.length === 0) {
            return Response.json({ error: "No tienes permiso para editar este comentario" }, { status: 403 });
        }

        await db.query("UPDATE comentarios SET comentario = ? WHERE id_comentario = ? AND id_usuario = ?", [comentarioLimpio, idComentarioNum, idUsuarioNum]);

        const comentarioActualizado = await obtenerComentarioPorId(idComentarioNum);

        return Response.json({ success: true, comentario: comentarioActualizado }, { status: 200 });
    } catch (error) {
        console.error("Error PUT /api/comentarios:", error);
        return Response.json({ error: "Error al actualizar comentario" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id_comentario, id_usuario } = await req.json();

        const idComentarioNum = Number(id_comentario);
        const idUsuarioNum = Number(id_usuario);

        if (Number.isNaN(idComentarioNum) || idComentarioNum <= 0 || Number.isNaN(idUsuarioNum) || idUsuarioNum <= 0) {
            return Response.json({ error: "Faltan id_comentario o id_usuario válidos" }, { status: 400 });
        }

        const comentarioExistente = await obtenerComentarioPorId(idComentarioNum);

        if (!comentarioExistente) {
            return Response.json({ error: "Comentario no encontrado" }, { status: 404 });
        }

        if (Number(comentarioExistente.id_usuario) !== idUsuarioNum) {
            return Response.json({ error: "No tienes permiso para eliminar este comentario" }, { status: 403 });
        }

        await db.query("DELETE FROM comentarios WHERE id_comentario = ? AND id_usuario = ?", [idComentarioNum, idUsuarioNum]);

        return Response.json({ success: true, id_comentario: idComentarioNum }, { status: 200 });
    } catch (error) {
        console.error("Error DELETE /api/comentarios:", error);
        return Response.json({ error: "Error al eliminar comentario" }, { status: 500 });
    }
}

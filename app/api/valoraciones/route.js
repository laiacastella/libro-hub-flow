import { db } from "@/lib/db";

export async function POST(req) {
    try {
        const body = await req.json();

        const idIntercambio = Number(body?.id_intercambio);
        const idUsuarioEvaluador = Number(body?.id_usuario_evaluador);
        const idUsuarioEvaluado = Number(body?.id_usuario_evaluado);
        const puntuacion = Number(body?.puntuacion);
        const valoracion = String(body?.valoracion || "").trim();

        if (!idIntercambio || !idUsuarioEvaluador || !idUsuarioEvaluado) {
            return Response.json({ error: "Faltan datos para registrar la valoracion" }, { status: 400 });
        }

        if (!Number.isInteger(puntuacion) || puntuacion < 1 || puntuacion > 5) {
            return Response.json({ error: "La puntuacion debe estar entre 1 y 5" }, { status: 400 });
        }

        if (!valoracion) {
            return Response.json({ error: "La valoracion es obligatoria" }, { status: 400 });
        }

        if (idUsuarioEvaluador === idUsuarioEvaluado) {
            return Response.json({ error: "No puedes evaluarte a ti mismo" }, { status: 400 });
        }

        const [intercambioRows] = await db.query("SELECT id_usuario_solicitante, id_usuario_propietario FROM intercambios WHERE id_intercambio = ? LIMIT 1", [idIntercambio]);

        if (!intercambioRows.length) {
            return Response.json({ error: "Intercambio no encontrado" }, { status: 404 });
        }

        const intercambio = intercambioRows[0];
        const participantes = [Number(intercambio.id_usuario_solicitante), Number(intercambio.id_usuario_propietario)];

        if (!participantes.includes(idUsuarioEvaluador) || !participantes.includes(idUsuarioEvaluado)) {
            return Response.json({ error: "Solo los usuarios del intercambio pueden valorar" }, { status: 403 });
        }

        const [valoracionExistente] = await db.query("SELECT id_valoracion FROM valoraciones WHERE id_intercambio = ? AND id_usuario_evaluador = ? LIMIT 1", [idIntercambio, idUsuarioEvaluador]);

        if (valoracionExistente.length > 0) {
            return Response.json({ error: "Ya has valorado este intercambio" }, { status: 409 });
        }

        await db.query(
            `
            INSERT INTO valoraciones (
                id_intercambio,
                id_usuario_evaluador,
                id_usuario_evaluado,
                puntuacion,
                valoracion,
                fecha_valoracion
            )
            VALUES (?, ?, ?, ?, ?, NOW())
            `,
            [idIntercambio, idUsuarioEvaluador, idUsuarioEvaluado, puntuacion, valoracion],
        );

        await db.query(
            `
            UPDATE usuarios
            SET puntuacion_promedio = (
                SELECT ROUND(AVG(puntuacion), 2)
                FROM valoraciones
                WHERE id_usuario_evaluado = ?
            )
            WHERE id_usuario = ?
            `,
            [idUsuarioEvaluado, idUsuarioEvaluado],
        );

        return Response.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error POST /api/valoraciones:", error);
        return Response.json({ error: "Error al guardar la valoracion" }, { status: 500 });
    }
}

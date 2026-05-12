import { db } from "@/lib/db";

export async function POST(req) {
    try {
        const {
            id_intercambio,
            id_usuario_reporta,
            tipo_accion,
            descripcion,
            valoracion,
        } = await req.json();

        // Validar datos requeridos
        if (!id_intercambio || !id_usuario_reporta || !tipo_accion || !descripcion) {
            return Response.json(
                { error: "Faltan datos requeridos" },
                { status: 400 }
            );
        }

        // Obtener información del intercambio con datos de usuarios
        const [intercambioRows] = await db.query(
            `SELECT i.id_libro_solicitado, i.id_libro_ofrecido, 
                    i.estado_usuario_envia, i.estado_usuario_recibe,
                    i.id_usuario_envia, i.id_usuario_recibe,
                    ls.id_usuario as libro_solicitado_propietario,
                    lo.id_usuario as libro_ofrecido_propietario
             FROM intercambios i
             LEFT JOIN libros ls ON i.id_libro_solicitado = ls.id_libro
             LEFT JOIN libros lo ON i.id_libro_ofrecido = lo.id_libro
             WHERE i.id_intercambio = ?`,
            [id_intercambio]
        );

        if (!intercambioRows.length) {
            return Response.json(
                { error: "Intercambio no encontrado" },
                { status: 404 }
            );
        }

        const intercambio = intercambioRows[0];
        const { id_libro_solicitado, id_libro_ofrecido } = intercambio;
        const idUsuarioEnvia = Number(intercambio.id_usuario_envia);
        const idUsuarioRecibe = Number(intercambio.id_usuario_recibe);
        const idUsuarioReporta = Number(id_usuario_reporta);

        // Determinar qué usuario está reportando
        const esSolicitante = idUsuarioReporta === idUsuarioEnvia;
        const esPropietario = idUsuarioReporta === idUsuarioRecibe;

        if (!esSolicitante && !esPropietario) {
            return Response.json(
                { error: "No tienes permiso para reportar este intercambio" },
                { status: 403 }
            );
        }

        // Verificar que el intercambio no esté ya finalizado o rechazado para este usuario
        const estadoActual = esSolicitante ? intercambio.estado_usuario_envia : intercambio.estado_usuario_recibe;
        const estadosFinales = ["finalizado", "rechazado", "eliminado"];
        if (estadosFinales.includes(estadoActual)) {
            return Response.json(
                { error: "Tu parte del intercambio ya está finalizada" },
                { status: 400 }
            );
        }

        // Determinar qué libro pertenece al usuario que reporta
        // - El solicitante (envía) es propietario del libro_ofrecido
        // - El propietario (recibe) es propietario del libro_solicitado
        const idLibroDelUsuario = esSolicitante ? id_libro_ofrecido : id_libro_solicitado;

        // Iniciar transacción para asegurar consistencia
        await db.query("START TRANSACTION");

        try {
            if (tipo_accion === "revertir") {
                // Revertir solo el estado del usuario que reporta
                const estadoCampo = esSolicitante ? 'estado_usuario_envia' : 'estado_usuario_recibe';
                await db.query(
                    `UPDATE intercambios 
                     SET ${estadoCampo} = 'rechazado'
                     WHERE id_intercambio = ?`,
                    [id_intercambio]
                );

                // Liberar solo el libro del usuario que reporta
                if (idLibroDelUsuario) {
                    await db.query(
                        `UPDATE libros 
                         SET disponibilidad = 'disponible' 
                         WHERE id_libro = ?`,
                        [idLibroDelUsuario]
                    );
                }
            } else if (tipo_accion === "cerrar") {
                // Cerrar solo el estado del usuario que reporta
                const estadoCampo = esSolicitante ? 'estado_usuario_envia' : 'estado_usuario_recibe';
                await db.query(
                    `UPDATE intercambios 
                     SET ${estadoCampo} = 'finalizado'
                     WHERE id_intercambio = ?`,
                    [id_intercambio]
                );

                // Archivar el libro del usuario que cierra (no solo reservar)
                if (idLibroDelUsuario) {
                    await db.query(
                        `UPDATE libros 
                         SET disponibilidad = 'archivado' 
                         WHERE id_libro = ?`,
                        [idLibroDelUsuario]
                    );
                }
            }

            // Guardar valoración si se proporcionó
            if (valoracion && valoracion.puntuacion && valoracion.valoracion) {
                const {
                    id_usuario_evaluador,
                    id_usuario_evaluado,
                    puntuacion,
                    valoracion: textoValoracion,
                } = valoracion;

                await db.query(
                    `INSERT INTO valoraciones (
                        id_intercambio,
                        id_usuario_evaluador,
                        id_usuario_evaluado,
                        puntuacion,
                        valoracion,
                        fecha_valoracion
                    ) VALUES (?, ?, ?, ?, ?, NOW())`,
                    [
                        id_intercambio,
                        id_usuario_evaluador,
                        id_usuario_evaluado,
                        puntuacion,
                        textoValoracion,
                    ]
                );
            }

            // Guardar reporte del problema (opcional - podrías tener una tabla de reportes)
            // Por ahora solo procesamos la acción solicitada

            await db.query("COMMIT");

            const libroLiberado = tipo_accion === "revertir" ? 
                (esSolicitante ? "tu libro ofrecido" : "tu libro solicitado") : 
                null;

            return Response.json({
                ok: true,
                message:
                    tipo_accion === "revertir"
                        ? `Tu libro ha sido liberado. El otro usuario puede seguir con su parte si lo desea.`
                        : "Intercambio cerrado",
                libro_liberado: libroLiberado,
                mi_estado: tipo_accion === "revertir" ? "rechazado" : "finalizado"
            });
        } catch (error) {
            await db.query("ROLLBACK");
            throw error;
        }
    } catch (error) {
        console.error("Error en POST /api/intercambios/problema:", error);
        return Response.json(
            { error: error.message || "Error al procesar el reporte" },
            { status: 500 }
        );
    }
}

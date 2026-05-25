import { db } from "@/lib/db";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const idIntercambio = searchParams.get("id_intercambio");
        const idUsuario = searchParams.get("id_usuario");

        // Validar parámetros
        if (!idIntercambio || !idUsuario) {
            return new Response(
                `<!DOCTYPE html>
                <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Error - LibroHubFlow</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                        <h1 style="color: #dc3545;">❌ Enlace inválido</h1>
                        <p>Faltan parámetros necesarios.</p>
                        <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}" style="color: #2e7d32;">Volver al inicio</a>
                    </body>
                </html>`,
                {
                    status: 400,
                    headers: { "Content-Type": "text/html; charset=utf-8" }
                }
            );
        }

        // Obtener información del intercambio
        const [rows] = await db.query(
            `SELECT 
                id_usuario_envia, 
                id_usuario_recibe, 
                estado_usuario_envia, 
                estado_usuario_recibe 
            FROM intercambios 
            WHERE id_intercambio = ?`,
            [idIntercambio]
        );

        if (rows.length === 0) {
            return new Response(
                `<!DOCTYPE html>
                <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Error - LibroHubFlow</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                        <h1 style="color: #dc3545;">❌ Intercambio no encontrado</h1>
                        <p>El intercambio ya no existe.</p>
                        <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}" style="color: #2e7d32;">Volver al inicio</a>
                    </body>
                </html>`,
                {
                    status: 404,
                    headers: { "Content-Type": "text/html; charset=utf-8" }
                }
            );
        }

        const intercambio = rows[0];
        const idUsuarioNum = Number(idUsuario);
        const esUsuarioEnvia = idUsuarioNum === Number(intercambio.id_usuario_envia);
        const esUsuarioRecibe = idUsuarioNum === Number(intercambio.id_usuario_recibe);

        if (!esUsuarioEnvia && !esUsuarioRecibe) {
            return new Response(
                `<!DOCTYPE html>
                <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Error - LibroHubFlow</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                        <h1 style="color: #dc3545;">❌ Acceso denegado</h1>
                        <p>No tienes permiso para realizar esta acción.</p>
                        <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}" style="color: #2e7d32;">Volver al inicio</a>
                    </body>
                </html>`,
                {
                    status: 403,
                    headers: { "Content-Type": "text/html; charset=utf-8" }
                }
            );
        }

        // Verificar que el usuario esté en estado "aceptado" (aún no ha confirmado)
        const estadoActual = esUsuarioEnvia ? intercambio.estado_usuario_envia : intercambio.estado_usuario_recibe;
        
        if (estadoActual !== "aceptado") {
            return new Response(
                `<!DOCTYPE html>
                <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Acción no disponible - LibroHubFlow</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                        <h1 style="color: #ffc107;">⚠️ Acción no disponible</h1>
                        <p>Ya has confirmado este intercambio o está en otro estado.</p>
                        <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/perfilUsuario?tab=solicitudes&id=${idUsuario}" style="color: #2e7d32;">Ver mis solicitudes</a>
                    </body>
                </html>`,
                {
                    status: 400,
                    headers: { "Content-Type": "text/html; charset=utf-8" }
                }
            );
        }

        // Actualizar el estado del usuario a "valorar"
        const columnaEstado = esUsuarioEnvia ? "estado_usuario_envia" : "estado_usuario_recibe";
        await db.query(
            `UPDATE intercambios SET ${columnaEstado} = 'valorar' WHERE id_intercambio = ?`,
            [idIntercambio]
        );

        // Archivar el libro correspondiente
        const columnaLibro = esUsuarioEnvia ? "id_libro_ofrecido" : "id_libro_solicitado";
        const [libroRows] = await db.query(
            `SELECT ${columnaLibro} as id_libro FROM intercambios WHERE id_intercambio = ?`,
            [idIntercambio]
        );
        
        if (libroRows.length > 0 && libroRows[0].id_libro) {
            await db.query(
                "UPDATE libros SET disponibilidad = 'archivado' WHERE id_libro = ?",
                [libroRows[0].id_libro]
            );
        }

        // Redirigir al usuario a la página de solicitudes para que valore
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        return new Response(
            `<!DOCTYPE html>
            <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Confirmación exitosa - LibroHubFlow</title>
                    <meta http-equiv="refresh" content="3;url=${baseUrl}/perfilUsuario?tab=solicitudes&id=${idUsuario}" />
                </head>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                    <h1 style="color: #28a745;">✅ ¡Confirmación exitosa!</h1>
                    <p>Tu entrega ha sido confirmada.</p>
                    <p style="margin-top: 20px;">Ahora puedes valorar al otro usuario.</p>
                    <p style="font-size: 14px; color: #666; margin-top: 30px;">
                        Serás redirigido automáticamente en 3 segundos...<br>
                        <a href="${baseUrl}/perfilUsuario?tab=solicitudes&id=${idUsuario}" style="color: #2e7d32;">Haz clic aquí si no te redirige</a>
                    </p>
                </body>
            </html>`,
            {
                status: 200,
                headers: { "Content-Type": "text/html; charset=utf-8" }
            }
        );

    } catch (error) {
        console.error("Error en confirmar-email:", error);
        return new Response(
            `<!DOCTYPE html>
            <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Error - LibroHubFlow</title>
                </head>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                    <h1 style="color: #dc3545;">❌ Error</h1>
                    <p>Ha ocurrido un error al procesar tu solicitud.</p>
                    <p style="font-size: 12px; color: #999;">${error.message}</p>
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}" style="color: #2e7d32;">Volver al inicio</a>
                </body>
            </html>`,
            {
                status: 500,
                headers: { "Content-Type": "text/html; charset=utf-8" }
            }
        );
    }
}
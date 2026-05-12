import { db } from "@/lib/db";
import nodemailer from "nodemailer";

const enviarEmailNotificacion = async (id_usuario_recibe, id_libro, id_solicitante) => {
    try {
        const [info] = await db.query(
            `SELECT 
                u_recibe.email AS email_duenyo, 
                u_recibe.nombre AS nombre_duenyo, 
                u_envia.nombre AS nombre_solicitante,
                l.titulo AS titulo
            FROM usuarios u_recibe
            JOIN usuarios u_envia ON u_envia.id_usuario = ?
            JOIN libros l ON l.id_libro = ?
            WHERE u_recibe.id_usuario = ?`,
            [id_solicitante, id_libro, id_usuario_recibe]
        );

        if (info.length > 0) {
            const { email_duenyo, nombre_duenyo, nombre_solicitante, titulo } = info[0];
            
            const enlaceSolicitud = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/perfilUsuario?id=${id_usuario_recibe}&intercambio=${id_solicitante}`;

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{ 
                    user: process.env.EMAIL_USER, 
                    pass: process.env.EMAIL_PASS 
                }
            });

            await transporter.sendMail({
                from: '"Libro-Hub" <@librohub.com>',
                to: email_duenyo,
                subject: `¡Buenas noticias! ${nombre_solicitante} tiene una propuesta para ti`,
                html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #444; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
                        <h2 style="color: #2e7d32; text-align: center;">¡Hola, ${nombre_duenyo}!</h2>
                        
                        <p style="font-size: 16px; line-height: 1.6;">
                            Esperamos que estés teniendo un día maravilloso. Te escribimos porque hay alguien que comparte tu amor por la lectura.
                        </p>
                        
                        <p style="font-size: 16px; line-height: 1.6;">
                            <strong>${nombre_solicitante}</strong> ha visto tu libro <span style="color: #2e7d32; font-weight: bold;">"${titulo}"</span> y le encantaría poder intercambiarlo contigo. 
                        </p>

                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${enlaceSolicitud}" 
                               style="background-color: #2e7d32; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                                Ver la solicitud de intercambio
                            </a>
                        </div>

                        <p style="font-size: 15px; color: #666; font-style: italic; text-align: center;">
                            "Cada libro compartido es una nueva historia que cobra vida."
                        </p>
                        
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        
                        <p style="font-size: 13px; color: #999; text-align: center;">
                            Gracias por ser parte de nuestra comunidad y por ayudar a dar una segunda vida a los libros. <br>
                            Con cariño, el equipo de <strong>Libro-Hub</strong>.
                        </p>
                    </div>
                `
            });
        }
    } catch (e) { 
        console.error("Error al enviar el email:", e.message); 
    }
};

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const user = searchParams.get("user");
        const mode = searchParams.get("mode");

        // Consulta para obtener el numero de solicitudes de intercambio
        if (mode === "count" && user) {
            const [rows] = await db.query(
                `
                SELECT COUNT(*) AS total
                FROM intercambios
                WHERE (id_usuario_envia = ? OR id_usuario_recibe = ?)
                AND (estado_usuario_recibe IS NULL OR estado_usuario_recibe != 'eliminado')
                AND (estado_usuario_envia IS NULL OR estado_usuario_envia != 'eliminado')
                `,
                [user, user]
            );

            return Response.json({ total: rows[0].total });
        }

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
        const {
            id_usuario_envia,
            id_usuario_recibe,
            id_libro_solicitado
        } = await req.json();

        if (!id_usuario_envia || !id_usuario_recibe || !id_libro_solicitado) {
            return Response.json({ error: "Faltan datos" }, { status: 400 });
        }

        const ahora = new Date();
        const fechaEspana = ahora.toLocaleString("sv-SE", { timeZone: "Europe/Madrid" }); 

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
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                id_usuario_envia,
                id_usuario_recibe,
                id_libro_solicitado,
                "solicitado",
                "solicitado",
                fechaEspana
            ]
        );

        awaitenviarEmailNotificacion(id_usuario_recibe, id_libro_solicitado, id_usuario_envia);
        
        return Response.json(
            { id: result.insertId, message: "Intercambio creado" },
            { status: 201 }
        );
    } catch (error) {
        console.error("DB ERROR:", error?.message);
        return Response.json({ error: "Error BBDD" }, { status: 500 });
    }
}

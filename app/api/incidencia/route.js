import { db } from "@/lib/db";
import nodemailer from "nodemailer";

// Configurar email
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

async function enviarEmailIncidencia(datos) {
    try {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: "librohubflow@gmail.com",
            subject: `Nueva Incidencia: ${datos.asunto}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                    <!-- Header -->
                                    <tr>
                                        <td style="background: #63a26c; padding: 30px; text-align: center;">
                                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">Nueva Incidencia Reportada</h1>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td style="padding: 20px 30px 10px;">
                                            <div style="display: inline-block; background-color: #63a26c; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                                                ${datos.tipoIncidencia}
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td style="padding: 10px 30px;">
                                            <h2 style="color: #333333; margin: 0; font-size: 20px; font-weight: 600;">${datos.asunto}</h2>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td style="padding: 20px 30px;">
                                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; padding: 15px;">
                                                <tr>
                                                    <td style="padding: 8px 0;">
                                                        <span style="color: #666666; font-size: 14px;"><strong>Usuario:</strong></span>
                                                        <span style="color: #333333; font-size: 14px;">${datos.nombreCompleto}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 8px 0;">
                                                        <span style="color: #666666; font-size: 14px;"><strong>Email:</strong></span>
                                                        <a href="mailto:${datos.correoElectronico}" style="color: #63a26c; text-decoration: none; font-size: 14px;">${datos.correoElectronico}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 8px 0;">
                                                        <span style="color: #666666; font-size: 14px;"><strong>Teléfono:</strong></span>
                                                        <span style="color: #333333; font-size: 14px;">${datos.telefono || "No proporcionado"}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    
                                    <!-- Descripción -->
                                    <tr>
                                        <td style="padding: 20px 30px;">
                                            <h3 style="color: #333333; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Descripción Detallada:</h3>
                                            <div style="background-color: #f8f9fa; border-left: 4px solid #63a26c; padding: 15px; border-radius: 4px; color: #333333; font-size: 14px; line-height: 1.6;">
                                                ${datos.descripcion.replace(/\n/g, "<br>")}
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="padding: 20px 30px; border-top: 1px solid #e0e0e0;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="text-align: center;">
                                                        <p style="color: #999999; font-size: 12px; margin: 0;"> Recibido el ${new Date().toLocaleString("es-ES", { dateStyle: "full", timeStyle: "short" })}</p>
                                                        <p style="color: #999999; font-size: 12px; margin: 10px 0 0 0;">LibroHub Flow - Sistema de Gestión de Incidencias</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email de incidencia enviado correctamente");
    } catch (error) {
        console.error("Error al enviar email:", error);
        throw error;
    }
}

export async function POST(req) {
    try {
        const { nombreCompleto, correoElectronico, telefono, tipoIncidencia, asunto, descripcion } = await req.json();

        // Validar campos requeridos
        if (!nombreCompleto || !correoElectronico || !tipoIncidencia || !asunto || !descripcion) {
            return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), { status: 400 });
        }

        const fechaCreacion = new Date();
        const estado = "pendiente";

        // Guardar en la base de datos
        await db.query(
            `INSERT INTO incidencias (nombre_completo, email, telefono, asunto, descripcion, fecha_creacion, estado, tipo) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombreCompleto, correoElectronico, telefono || null, asunto, descripcion, fechaCreacion, estado, tipoIncidencia],
        );

        // Intentar enviar email
        try {
            await enviarEmailIncidencia({
                nombreCompleto,
                correoElectronico,
                telefono,
                tipoIncidencia,
                asunto,
                descripcion,
            });
        } catch (emailError) {
            console.error("Error al enviar email (incidencia guardada en BD):", emailError);
        }
    } catch (error) {
        console.error("Error al registrar incidencia:", error);
    }
}

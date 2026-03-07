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
                <h2>Nueva Incidencia Reportada</h2>
                <p><strong>Tipo:</strong> ${datos.tipoIncidencia}</p>
                <p><strong>Nombre:</strong> ${datos.nombreCompleto}</p>
                <p><strong>Email:</strong> ${datos.correoElectronico}</p>
                <p><strong>Teléfono:</strong> ${datos.telefono || "No proporcionado"}</p>
                <p><strong>Asunto:</strong> ${datos.asunto}</p>
                <p><strong>Descripción:</strong></p>
                <p>${datos.descripcion.replace(/\n/g, "<br>")}</p>
                <p><em>Fecha: ${new Date().toLocaleString("es-ES")}</em></p>
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

        // Intentar enviar email (no bloquear si falla)
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

        return new Response(JSON.stringify({ ok: true, message: "Incidencia registrada correctamente" }), { status: 201 });
    } catch (error) {
        console.error("Error al registrar incidencia:", error);
        return new Response(JSON.stringify({ error: "Error al registrar la incidencia", detalle: error.message }), { status: 500 });
    }
}

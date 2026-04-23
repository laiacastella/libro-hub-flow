import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { transporter } from "@/lib/mailer";

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email requerido" },
                { status: 400 }
            );
        }

        // 1. Buscar usuario en MySQL
        const [rows] = await db.query(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return NextResponse.json({
                message: "Email enviado correctamente"
            });
        }

        const user = rows[0];

        // 2. Generar token seguro
        const token = crypto.randomUUID();

        // 3. Expiración (30 min)
        const expira = new Date(Date.now() + 1000 * 60 * 30);

        // 4. Guardar en BD
        await db.query(
            `UPDATE usuarios 
             SET reset_token = ?, reset_token_expira = ?
             WHERE id_usuario = ?`,
            [token, expira, user.id_usuario]
        );

        // 5. Link de reset
        const resetLink = `https://libro-hub-flow.vercel.app/resetPassword?token=${token}`;

        // 6. Enviar email
        await transporter.sendMail({
            from: `"LibroHubFlow" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Restablecer contraseña",
            html: `
                <div style="font-family: Arial;">
                    <h2>🔐 Restablecer contraseña</h2>
                    <p>Has solicitado cambiar tu contraseña.</p>
                    <p>Haz clic en el botón:</p>

                    <a href="${resetLink}" 
                       style="display:inline-block;padding:10px 20px;background:#000;color:#fff;text-decoration:none;border-radius:5px;">
                       Restablecer contraseña
                    </a>

                    <p style="margin-top:20px;color:#666;">
                        Este enlace expira en 30 minutos.
                    </p>
                </div>
            `,
        });

        return NextResponse.json({
            message: "Email enviado correctamente"
        });

    } catch (error) {
        console.error("ERROR FORGOT PASSWORD:", error);

        return NextResponse.json(
            {
                message: "Error en el servidor",
                error: error.message
            },
            { status: 500 }
        );
    }
}
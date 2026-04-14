import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req) {
    try {
        const { token, password_hash } = await req.json();

        if (!token || !password_hash) {
            return NextResponse.json(
                { message: "Datos incompletos" },
                { status: 400 }
            );
        }

        // 1. Buscar usuario por token válido
        const [rows] = await db.query(
            `SELECT * FROM usuarios 
             WHERE reset_token = ? 
             AND reset_token_expira > NOW()`,
            [token]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { message: "Token inválido o expirado" },
                { status: 400 }
            );
        }

        const user = rows[0];

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password_hash, 10);

        // 3. Actualizar usuario
        await db.query(
            `UPDATE usuarios 
             SET password_hash = ?, reset_token = NULL, reset_token_expira = NULL
             WHERE id_usuario = ?`,
            [hashedPassword, user.id_usuario]
        );

        return NextResponse.json({
            message: "Contraseña actualizada correctamente"
        });

    } catch (error) {
        console.error("ERROR RESET PASSWORD:", error);

        return NextResponse.json(
            {
                message: "Error del servidor",
                error: error.message
            },
            { status: 500 }
        );
    }
}
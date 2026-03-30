import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { id_usuario, password, ...campos } = await req.json();

        if (!id_usuario) {
            return new Response(
                JSON.stringify({ success: false, error: "Falta id_usuario" }),
                { status: 400 }
            );
        }

        delete campos.repPassword;

        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            campos.password_hash = hashedPassword;
        }

        if (campos.nick_usuario) {
            const [existeNick] = await db.query(
                "SELECT id_usuario FROM usuarios WHERE nick_usuario = ? AND id_usuario != ?",
                [campos.nick_usuario, id_usuario]
            );

            if (existeNick.length > 0) {
                return new Response(
                    JSON.stringify({ success: false, error: "El nombre de usuario ya está en uso" }),
                    { status: 400 }
                );
            }
        }

        if (campos.email) {
            const [existeEmail] = await db.query(
                "SELECT id_usuario FROM usuarios WHERE email = ? AND id_usuario != ?",
                [campos.email, id_usuario]
            );

            if (existeEmail.length > 0) {
                return new Response(
                    JSON.stringify({ success: false, error: "El correo electrónico ya está registrado" }),
                    { status: 400 }
                );
            }
        }

        Object.keys(campos).forEach((key) => {
            if (campos[key] === "" || campos[key] === null) {
                delete campos[key];
            }
        });

        const keys = Object.keys(campos);
        const values = Object.values(campos);

        if (keys.length === 0) {
            return new Response(
                JSON.stringify({ success: false, error: "No hay campos para actualizar" }),
                { status: 400 }
            );
        }

        const setClause = keys.map(key => `${key} = ?`).join(", ");

        await db.query(
            `UPDATE usuarios SET ${setClause} WHERE id_usuario = ?`,
            [...values, id_usuario]
        );

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200 }
        );

    } catch (error) {
        console.error(error);

        return new Response(
            JSON.stringify({ success: false, error: "Error en el servidor" }),
            { status: 500 }
        );
    }
}
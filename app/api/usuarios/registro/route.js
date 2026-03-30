import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM usuarios");
        return Response.json(rows);
    } catch (error) {
        return Response.json({ error: "Error BBDD" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { nick_usuario, email, password, nombre, apellidos, telefono, id_provincia, id_poblacion } = await req.json();

        if (!nick_usuario || !email || !password || !nombre || !id_provincia || !id_poblacion || !apellidos) {
            return new Response(JSON.stringify({ success: false, error: "Faltan datos obligatorios" }), { status: 400 });
        }

        const [existeNick] = await db.query(
            "SELECT id_usuario FROM usuarios WHERE nick_usuario = ?",
            [nick_usuario]
        );

        if (existeNick.length > 0) {
            return new Response(
                JSON.stringify({ success: false, error: "El nombre de usuario ya está en uso" }),
                { status: 400 }
            );
        }

        const [existeEmail] = await db.query(
            "SELECT id_usuario FROM usuarios WHERE email = ?",
            [email]
        );

        if (existeEmail.length > 0) {
            return new Response(
                JSON.stringify({ success: false, error: "El correo electrónico ya está registrado" }),
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [resultado] = await db.query(
            `INSERT INTO usuarios
            (nick_usuario, email, password_hash, nombre, apellidos, telefono, id_provincia, id_poblacion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nick_usuario, email, hashedPassword, nombre, apellidos, telefono, id_provincia, id_poblacion],
        );

        return new Response(
            JSON.stringify({ success: true, id_usuario: resultado.insertId }),
            { status: 200 }
        );

    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            if (error.message.includes("nick_usuario")) {
                return new Response(
                    JSON.stringify({ success: false, error: "El nombre de usuario ya existe" }),
                    { status: 400 }
                );
            }

            if (error.message.includes("email")) {
                return new Response(
                    JSON.stringify({ success: false, error: "El correo ya está registrado" }),
                    { status: 400 }
                );
            }

            return new Response(
                JSON.stringify({ success: false, error: "Usuario duplicado" }),
                { status: 400 }
            );
        }

        return new Response(
            JSON.stringify({ success: false, error: "Error en el servidor" }),
            { status: 500 }
        );
    }
}
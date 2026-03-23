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

        if (!nick_usuario || !email || !password || !nombre || !id_provincia || !id_poblacion || !telefono || !apellidos) {
            return new Response(JSON.stringify({ error: "Faltan datos obligatorios" }), { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [resultado] = await db.query(
            `INSERT INTO usuarios
            (nick_usuario, email, password_hash, nombre, apellidos, telefono, id_provincia, id_poblacion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nick_usuario, email, hashedPassword, nombre, apellidos, telefono, id_provincia, id_poblacion],
        );

        return new Response(JSON.stringify({ success: true, id_usuario: resultado.insertId }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
import { db } from "@/lib/db";

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
        const { nick_usuario, email, password_hash, nombre, apellidos, telefono, id_provincia, id_poblacion } = await req.json();

        // Validar campos obligatorios
        if (!nick_usuario || !email || !password_hash || !nombre || !id_provincia || !id_poblacion || !telefono || !apellidos) {
            return new Response(JSON.stringify({ error: "Faltan datos obligatorios" }), { status: 400 });
        }

        const [resultado] = await db.query(
            `INSERT INTO usuarios
      (nick_usuario, email, password_hash, nombre, apellidos, telefono, id_provincia, id_poblacion)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nick_usuario, email, password_hash, nombre, apellidos, telefono, id_provincia, id_poblacion],
        );

        return new Response(JSON.stringify({ success: true, id_usuario: resultado.insertId }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

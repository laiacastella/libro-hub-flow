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
        const { foto_perfil } = await req.json();

        if (!foto_perfil) {
            return new Response(JSON.stringify({ error: "Falta la URL de la imagen" }), { status: 400 });
        }

        // Guardamos solo la foto_perfil, id_usuario se genera automáticamente
        const [resultado] = await db.query(
            "INSERT INTO usuarios (foto_perfil, id_provincia, id_poblacion) VALUES (?, ?, ?)",
            [foto_perfil, 1, 1], // 1 debe existir en provincias y poblaciones
        );

        return new Response(JSON.stringify({ success: true, id_usuario: resultado.insertId }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

import { db } from "@/lib/db";

export async function POST(req) {
    try {
        const { id_usuario, ...campos } = await req.json();

        if (!id_usuario) {
            return new Response(JSON.stringify({ error: "Falta id_usuario" }), { status: 400 });
        }

        // Construir query dinámica
        const keys = Object.keys(campos);
        const values = Object.values(campos);

        if (keys.length === 0) {
            return new Response(JSON.stringify({ error: "No hay campos para actualizar" }), { status: 400 });
        }

        const setClause = keys.map(key => `${key} = ?`).join(", ");

        const [result] = await db.query(
            `UPDATE usuarios SET ${setClause} WHERE id_usuario = ?`,
            [...values, id_usuario]
        );

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
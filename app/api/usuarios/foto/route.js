import { db } from "@/lib/db";

export async function POST(req) {
    try {
        const { id_usuario, foto_perfil } = await req.json();

        if (!id_usuario || !foto_perfil) {
            return new Response(JSON.stringify({ error: "Falta id_usuario o foto_perfil" }), { status: 400 });
        }

        await db.query(`UPDATE usuarios SET foto_perfil = ? WHERE id_usuario = ?`, [foto_perfil, id_usuario]);

        return new Response(JSON.stringify({ success: true, id_usuario }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

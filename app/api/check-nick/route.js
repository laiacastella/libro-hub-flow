import { db } from "@/lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const nick = searchParams.get("nick");

    if (!nick) {
        return Response.json({ disponible: false });
    }

    const [rows] = await db.query(
        "SELECT id_usuario FROM usuarios WHERE nick_usuario = ?",
        [nick]
    );

    return Response.json({ disponible: rows.length === 0 });
}
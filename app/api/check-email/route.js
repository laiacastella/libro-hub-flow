import { db } from "@/lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
        return Response.json({ disponible: false });
    }

    const [rows] = await db.query(
        "SELECT id_usuario FROM usuarios WHERE email = ?",
        [email]
    );

    return Response.json({ disponible: rows.length === 0 });
}
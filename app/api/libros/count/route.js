import { db } from "@/lib/db";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const user = searchParams.get("user");

        if (!user) {
            return Response.json({ error: "Falta user" }, { status: 400 });
        }

        const [rows] = await db.query(
            "SELECT COUNT(*) AS total FROM libros WHERE id_usuario = ?",
            [user]
        );

        return Response.json({ total: rows[0].total });

    } catch (error) {
        return Response.json({ error: "Error BBDD" }, { status: 500 });
    }
}
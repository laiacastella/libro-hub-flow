import { db } from "@/lib/db";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id_provincia = searchParams.get("id_provincia");

        // Si no llega provincia → no devolvemos nada o todo (a tu elección)
        if (!id_provincia) {
            return Response.json([]);
        }

        const [rows] = await db.query(
            "SELECT id_poblacion, poblacion FROM poblaciones WHERE id_provincia = ?",
            [id_provincia]
        );

        return Response.json(rows);

    } catch (error) {
        return Response.json({ error: "Error BBDD" }, { status: 500 });
    }
}
import pool from "@/lib/db";

export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM ubicacion");
        return Response.json({ conectado: true, data: rows });
    } catch (err) {
        return Response.json({ conectado: false, error: err.message }, { status: 500 });
    }
}

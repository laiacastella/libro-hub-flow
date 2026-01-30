import pool from "@/lib/db";

export async function GET() {
    try {
        const [rows] = await pool.query("SELECT 1 AS ok");
        return Response.json({ conectado: true, rows });
    } catch (err) {
        return Response.json({ conectado: false, error: err.message }, { status: 500 });
    }
}

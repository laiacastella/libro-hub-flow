import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
    const { token } = await req.json();

    const ahora = new Date();
    const horaActualMadrid = ahora.toLocaleString("sv-SE", { timeZone: "Europe/Madrid" });

    const [rows] = await db.query(
        `SELECT id_usuario FROM usuarios 
        WHERE reset_token = ? 
        AND reset_token_expira > ?`,
        [token, horaActualMadrid]
    );

    if (rows.length === 0) {
        return NextResponse.json(
            { valid: false },
            { status: 400 }
        );
    }

    return NextResponse.json({ valid: true });
}
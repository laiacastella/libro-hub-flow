import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
    const { token } = await req.json();

    const [rows] = await db.query(
        `SELECT id_usuario FROM usuarios 
         WHERE reset_token = ? 
         AND reset_token_expira > NOW()`,
        [token]
    );

    if (rows.length === 0) {
        return NextResponse.json(
            { valid: false },
            { status: 400 }
        );
    }

    return NextResponse.json({ valid: true });
}
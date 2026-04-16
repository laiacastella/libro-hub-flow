import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
    const { email, token, expira } = await req.json();

    await db.query(
        `UPDATE usuarios 
         SET reset_token = ?, reset_token_expira = ?
         WHERE email = ?`,
        [token, expira, email]
    );

    return NextResponse.json({ ok: true });
}
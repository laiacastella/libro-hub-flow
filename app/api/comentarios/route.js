import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id_libro = searchParams.get("id_libro");

    try {
        const [rows] = await db.query(
            "SELECT id_comentario, id_usuario, comentario, fecha_comentario FROM comentarios WHERE id_libro = ?",
            [id_libro]
        );
        
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error API Comentarios:", error);
        return NextResponse.json({ error: "Error en la base de datos" }, { status: 500 });
    }
}
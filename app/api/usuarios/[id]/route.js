import { db } from "@/lib/db";

export async function GET(request, { params }) {
    try {
        const { id } = await params; 

        // Consultamos solo los datos que necesitamos mostrar en la card
        const [rows] = await db.query(
            "SELECT nick_usuario, nombre, foto_perfil FROM usuarios WHERE id_usuario = ?", 
            [id]
        );

        if (rows.length === 0) {
            return Response.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        // Devolvemos el objeto del usuario
        return Response.json(rows[0]); 
    } catch (error) {
        console.error("Error en API Usuario individual:", error);
        return Response.json({ error: "Error de servidor" }, { status: 500 });
    }
}
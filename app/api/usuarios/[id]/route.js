import { db } from "@/lib/db";

export async function GET(request, { params }) {
    try {
        const { id } = await params; 

        // Modificamos la consulta para incluir todos los campos necesarios
        const [rows] = await db.query(
            `SELECT 
                nick_usuario,
                nombre,
                apellidos,
                poblacion, 
                provincia, 
                codigo_postal,
                puntuacion_promedio, 
                foto_perfil 
             FROM usuarios 
             WHERE id_usuario = ?`, 
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
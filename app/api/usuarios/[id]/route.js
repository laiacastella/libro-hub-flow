import { db } from "@/lib/db";

export async function GET(request, { params }) {
    try {
        const { id } = await params; 

        // Consulta SQL completa para evitar campos "undefined"
        const [rows] = await db.query(
            `SELECT 
                id_usuario,
                nick_usuario,
                nombre,
                apellidos,
                email,
                poblacion, 
                provincia, 
                codigo_postal,
                telefono,
                puntuacion_promedio, 
                foto_perfil 
             FROM usuarios 
             WHERE id_usuario = ?`, 
            [id]
        );

        if (rows.length === 0) {
            return Response.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        return Response.json(rows[0]); 
    } catch (error) {
        console.error("Error en API Usuario individual:", error);
        return Response.json({ error: "Error de servidor" }, { status: 500 });
    }
}
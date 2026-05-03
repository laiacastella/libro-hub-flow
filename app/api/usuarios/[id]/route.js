import { db } from "@/lib/db";

export async function GET(request, { params }) {
    try {
        const { id } = await params; 

        // Consulta SQL completa para evitar campos "undefined"
        const [rows] = await db.query(
            `SELECT 
                u.id_usuario,
                u.nick_usuario,
                u.email,
                u.nombre,
                u.apellidos,
                u.foto_perfil,
                u.password_hash,
                u.telefono,
                u.codigo_postal,
                u.puntuacion_promedio,
                p.provincia AS provincia,
                po.poblacion AS poblacion
            FROM usuarios u
            LEFT JOIN provincias p ON u.id_provincia = p.id_provincia
            LEFT JOIN poblaciones po ON u.id_poblacion = po.id_poblacion
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
import { db } from "@/lib/db";

export async function GET(request, { params }) {
    try {
        const resolvedParams = await params; 
        const id = resolvedParams.id;
        
        console.log("ID recibido en API:", id); 

        const [rows] = await db.query(
            `SELECT libros.*, generos.tipo_genero, usuarios.nick_usuario, usuarios.puntuacion_promedio
            FROM libros 
            INNER JOIN generos ON libros.id_genero = generos.id_genero 
            INNER JOIN usuarios ON libros.id_usuario = usuarios.id_usuario
            WHERE libros.id_libro = ?;`,
            [id]
        );

        if (rows.length === 0) {
            return Response.json({ error: "Libro no encontrado" }, { status: 404 });
        }

        return Response.json(rows[0]);
    } catch (error) {
        console.error("Error en API Libros:", error);
        return Response.json({ error: "Error BBDD" }, { status: 500 });
    }
}
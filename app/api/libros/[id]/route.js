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

export async function PUT(request, { params }) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id; 

        const body = await request.json();
        const { titulo, autor, descripcion, id_genero, estado_fisico, foto_portada } = body;

        if (!titulo || !autor || !id_genero || !estado_fisico) {
            return Response.json(
                { error: "Asegúrate de que todos los campos obligatorios están llenos." }, 
                { status: 400 }
            );
        }


        const [result] = await db.query(
            `UPDATE libros 
             SET titulo = ?, autor = ?, descripcion = ?, id_genero = ?, estado_fisico = ?, foto_portada = ?
             WHERE id_libro = ?;`,
            [titulo, autor, descripcion, id_genero, estado_fisico, foto_portada, id]
        );

        if (result.affectedRows === 0) {
            return Response.json({ error: "No se encontró el libro para actualizar" }, { status: 404 });
        }

        return Response.json({ success: true, message: "Libro actualizado correctamente" });

    } catch (error) {
        console.error("Error al actualizar libro en la BBDD:", error);
        return Response.json({ error: "Error interno al guardar en la BBDD" }, { status: 500 });
    }
}